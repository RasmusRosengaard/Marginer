# Marginer — WoW Profession Profit Margin Calculator

## Overview

A Vue.js web app for calculating the expected profit margin on World of Warcraft profession crafts. Prices are fetched live from the Blizzard API. Calculations factor in crafting stat procs (Multicraft and Resourcefulness) to produce a realistic expected value rather than a naive cost/revenue comparison.

---

## Starting Scope: Arcanoweave Bolt

The first craft to implement is **Arcanoweave Bolt**.

- Base output: **2 bolts per craft** (minimum, before procs)
- Reagents: to be confirmed against Blizzard API recipe data

---

## Crafting Stats

### Multicraft
- Gives a chance to produce extra items beyond the base output.
- When it procs, it yields **1 to 2.5× the base output** in additional items.
  - Example: a craft with a base output of 2 can yield 1–5 *extra* bolts on a proc.
- Does **not** apply to crafted gear or enchantments.
- Considered the strongest crafting stat for any recipe it works on.
- User inputs: Multicraft rating / proc % (formula TBD as we research further).

### Resourcefulness
- Gives a chance to use fewer tradeable reagents per craft.
- Saves a variable number of materials when it procs; exact amounts are unpredictable.
- The only crafting stat that improves profit on **work orders**.
- User inputs: Resourcefulness rating / proc % (formula TBD).

---

## Quality System (Midnight)

### Quality Tiers
In WoW Midnight, crafted items and reagents have **2 quality tiers**: Silver and Gold (simplified from Dragonflight's 3 tiers).

Arcanoweave Bolts can be crafted as Silver or Gold quality. Gold bolts sell for more on the AH and also grant bonus skill when used as reagents in downstream crafts.

### How Output Quality Is Determined
Each recipe has a **Recipe Difficulty** value. Your total **Crafting Skill** is compared against it:

- `Skill >= Recipe Difficulty` → **Gold** (max quality) output
- `Skill < Recipe Difficulty` → **Silver** (lower quality), scaled by how far below you are

### What Contributes to Crafting Skill
| Source | Notes |
|---|---|
| Base profession skill | From levelling Tailoring |
| Reagent quality | Gold reagents give significantly more skill than Silver (e.g. ~+100 skill for a full swap to Gold) |
| Profession gear | Gear with skill stat bonuses |
| Specialization bonuses | Talent tree nodes |
| Finishing reagents | Optional reagents that add skill or stats |
| Consumables | Flasks, food buffs, etc. |

### Concentration
- Each crafter has a **Concentration bar** (max 1,000 points) that fills at **1 point per 6 minutes** (10/hour).
- Spending Concentration on a craft **guarantees the next quality tier** above what your skill would normally produce.
- The **Ingenuity** stat can partially refund Concentration spent.
- Concentration is a finite resource — its cost should factor into expected profit when relevant.

### Impact on the Calculator
Quality is handled via **manual user selection** — the user knows their setup and picks:
1. **Reagent quality** — Silver or Gold for each input material (affects AH cost)
2. **Output quality** — Silver or Gold bolt (affects AH revenue)

No skill/difficulty formula needed. The calculator uses the selected qualities to look up the correct AH prices on both sides.

---

## Profit Calculation Logic (intended)

```
-- Output quantity
expected_output = base_output + (multicraft_proc_chance × expected_extra_items)

-- Reagent cost after Resourcefulness
expected_reagents[i] = base_reagents[i] - (resourcefulness_proc_chance × expected_savings[i])

-- Revenue uses the user-selected output quality price
revenue = expected_output × selected_output_quality_ah_price

-- Cost uses the quality of reagents the user is supplying
cost = sum(expected_reagents[i] × reagent_ah_price[i])

profit = revenue - cost
margin = profit / revenue × 100
```

All prices (reagents and crafted item per quality tier) are pulled from the Blizzard Auction House API.

---

## Blizzard API Integration

- Endpoint: Blizzard Game Data API (auction house / item prices)
- Auth: OAuth client credentials flow
- Data needed per craft: current AH price for each reagent and for the output item

---

## Future Scope

- Add more crafts and professions beyond Arcanoweave Bolt
- Talent modifiers (some talents increase Multicraft's ceiling or Resourcefulness savings)
- Work order vs. self-craft profit comparison
- Crafting queue / batch size optimizer
