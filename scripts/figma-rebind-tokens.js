/**
 * Figma Rebind Tokens — Context-Aware Variable Binding
 *
 * 用途：將 generate_figma_design 推上去的 raw hex 顏色，
 *       自動綁定到 Figma 檔案中已建立的 semantic / primitive variables。
 *
 * 使用方式：透過 use_figma 工具執行，將 TARGET_ID 替換為目標 frame 的 node ID。
 *
 * 判斷邏輯（context-aware）：
 *   - TEXT node fills    → content/* semantics（如 content/primary, content/secondary）
 *   - Button-like fills  → primary/* semantics（如 primary/default）
 *   - Frame/shape fills  → surface/* semantics（如 surface/inverse, surface/container）
 *   - Strokes            → outline/* semantics（如 outline/default, outline/strong）
 *   - 以上未命中          → 退回 primitives collection（如 color/forest/800）
 *
 * 已綁定 variable 的 paint 會自動跳過，不會重複處理。
 */

// ─── CONFIG ──────────────────────────────────────────────
const TARGET_ID = '__TARGET_ID__'; // 👈 Replace with target frame node ID
// ─────────────────────────────────────────────────────────

// ─── Step 1: Load variables & build lookup ───────────────
const allVars = await figma.variables.getLocalVariablesAsync('COLOR');
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const colLookup = {};
for (const c of collections) colLookup[c.id] = c;

async function resolveRGBA(variable) {
  const col = colLookup[variable.variableCollectionId];
  if (!col) return null;
  let val = variable.valuesByMode[col.modes[0].modeId];
  let depth = 0;
  while (val && val.type === 'VARIABLE_ALIAS' && depth < 10) {
    const ref = await figma.variables.getVariableByIdAsync(val.id);
    if (!ref) break;
    const refCol = colLookup[ref.variableCollectionId];
    if (!refCol) break;
    val = ref.valuesByMode[refCol.modes[0].modeId];
    depth++;
  }
  return (val && typeof val === 'object' && 'r' in val) ? val : null;
}

function rgbaToKey(rgba) {
  const h = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
  const a = rgba.a !== undefined ? rgba.a : 1;
  return `${h(rgba.r)}${h(rgba.g)}${h(rgba.b)}|${a.toFixed(2)}`;
}

// Build maps: hexKey → Variable, grouped by semantic category
const maps = { content: {}, surface: {}, primary: {}, outline: {}, primitive: {} };

for (const v of allVars) {
  const rgba = await resolveRGBA(v);
  if (!rgba) continue;
  const key = rgbaToKey(rgba);
  const col = colLookup[v.variableCollectionId];

  if (col.name === 'semantics') {
    let cat = null;
    if (v.name.startsWith('content/')) cat = 'content';
    else if (v.name.startsWith('surface/')) cat = 'surface';
    else if (v.name.startsWith('primary/')) cat = 'primary';
    else if (v.name.startsWith('outline/')) cat = 'outline';
    // state/* and secondary/* are skipped — too context-specific for auto-rebind
    if (cat && !maps[cat][key]) maps[cat][key] = v;
  } else if (col.name === 'primitives') {
    if (!maps.primitive[key]) maps.primitive[key] = v;
  }
}

// ─── Step 2: Context detection ───────────────────────────
function isButtonLike(node) {
  if (!node) return false;
  const name = (node.name || '').toLowerCase();
  return name.includes('btn') || name.includes('button') || name.includes('cta');
}

function paintToKey(paint) {
  if (paint.type !== 'SOLID') return null;
  const { r, g, b } = paint.color;
  const h = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
  const opacity = paint.opacity !== undefined ? paint.opacity : 1;
  return `${h(r)}${h(g)}${h(b)}|${opacity.toFixed(2)}`;
}

function hasBound(paint) {
  return !!(paint.boundVariables && paint.boundVariables.color);
}

function findVar(key, contextMaps) {
  for (const map of contextMaps) {
    if (map[key]) return map[key];
  }
  return null;
}

// ─── Step 3: Rebind engine ───────────────────────────────
const stats = { rebound: 0, skipped: 0, unmatched: [] };

function rebindPaint(paint, variable) {
  const bound = figma.variables.setBoundVariableForPaint(paint, 'color', variable);
  // Variable handles alpha internally → reset paint opacity to 1
  // to avoid double-application of transparency
  bound.opacity = 1;
  return bound;
}

function processNode(node) {
  // — Fills —
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const isText = node.type === 'TEXT';
    const isBtn =
      isButtonLike(node) ||
      isButtonLike(node.parent) ||
      (node.parent && isButtonLike(node.parent.parent));

    let contextMaps;
    if (isText && isBtn) {
      // Text inside a button → try primary/on-primary first, then content
      contextMaps = [maps.primary, maps.content, maps.primitive];
    } else if (isText) {
      contextMaps = [maps.content, maps.primitive];
    } else if (isBtn) {
      contextMaps = [maps.primary, maps.surface, maps.primitive];
    } else {
      contextMaps = [maps.surface, maps.primary, maps.primitive];
    }

    const newFills = node.fills.map((p) => {
      if (hasBound(p)) { stats.skipped++; return p; }
      const key = paintToKey(p);
      if (!key) return p;
      const v = findVar(key, contextMaps);
      if (v) {
        stats.rebound++;
        return rebindPaint(p, v);
      }
      stats.unmatched.push({
        id: node.id, name: node.name, prop: 'fill', key, type: node.type,
      });
      return p;
    });
    node.fills = newFills;
  }

  // — Strokes —
  if (node.strokes && Array.isArray(node.strokes) && node.strokes.length > 0) {
    const newStrokes = node.strokes.map((p) => {
      if (hasBound(p)) { stats.skipped++; return p; }
      const key = paintToKey(p);
      if (!key) return p;
      const v = findVar(key, [maps.outline, maps.primitive]);
      if (v) {
        stats.rebound++;
        return rebindPaint(p, v);
      }
      stats.unmatched.push({
        id: node.id, name: node.name, prop: 'stroke', key, type: node.type,
      });
      return p;
    });
    node.strokes = newStrokes;
  }

  // — Recurse children —
  if ('children' in node) {
    for (const child of node.children) processNode(child);
  }
}

// ─── Step 4: Execute ─────────────────────────────────────
// Switch to the page containing the target node (content loads lazily per page)
for (const pg of figma.root.children) {
  await figma.setCurrentPageAsync(pg);
  if (pg.findOne((n) => n.id === TARGET_ID)) break;
}

const target = await figma.getNodeByIdAsync(TARGET_ID);
if (!target) return { error: 'Node not found: ' + TARGET_ID };

processNode(target);

return {
  targetName: target.name,
  rebound: stats.rebound,
  skipped: stats.skipped,
  unmatchedCount: stats.unmatched.length,
  unmatched: stats.unmatched.slice(0, 30),
  mapSizes: {
    content: Object.keys(maps.content).length,
    surface: Object.keys(maps.surface).length,
    primary: Object.keys(maps.primary).length,
    outline: Object.keys(maps.outline).length,
    primitive: Object.keys(maps.primitive).length,
  },
};
