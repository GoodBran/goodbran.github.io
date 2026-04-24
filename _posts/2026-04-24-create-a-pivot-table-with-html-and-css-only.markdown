---
layout: post
title: "Create a Pivot Table with HTML and CSS Only"
date: 2026-04-24 12:00:00 +0800
description: "A beginner-friendly guide to building a static pivot-table layout with only HTML and CSS, focusing on scroll, borders, sticky totals, and merged cells."
---

Use a real `<table>`. Wrap it in a scroll box. For sticky rows or columns, use fixed widths, `border-collapse: separate`, and draw the borders yourself.

HTML and CSS cannot calculate pivot data. They can only display a pivot-table shape after the numbers are already prepared.

## The rules first

These are the parts that usually break:

- Put `overflow: auto` on a wrapper, not on the table.
- Use `colspan` and `rowspan` for merged cells.
- Give sticky columns fixed widths. The second sticky column needs `left` equal to the first column width.
- Do not use `border-collapse: collapse` for sticky tables. Use `border-collapse: separate` and `border-spacing: 0`.
- Give sticky cells a background, or scrolled text will show through.
- Let sticky edges draw their own borders. Remove the border from the normal cell beside them when needed.
- If a `rowspan` cell reaches the sticky footer, remove its bottom border too.

## Final shape

Scroll this table sideways and down. The header, first two columns, right Total column, and bottom Grand total row stay visible.

<div class="pivot-demo pivot-demo-final">
  <style>
    .pivot-demo-final {
      --c1: 6rem;
      --c2: 7rem;
      --total: 5.5rem;
    }

    .pivot-demo-final .scroll {
      max-height: 18rem;
      overflow: auto;
    }

    .pivot-demo-final table {
      border-collapse: separate;
      border-spacing: 0;
      table-layout: fixed;
      width: 880px;
      min-width: 880px;
    }

    .pivot-demo-final .c1 { width: var(--c1); }
    .pivot-demo-final .c2 { width: var(--c2); }
    .pivot-demo-final .ct { width: var(--total); }

    .pivot-demo-final th,
    .pivot-demo-final td {
      border: 0;
      border-right: 1px solid #999;
      border-bottom: 1px solid #999;
      padding: 0.35rem 0.5rem;
      white-space: nowrap;
    }

    .pivot-demo-final thead tr:first-child th {
      border-top: 1px solid #999;
    }

    .pivot-demo-final .before-right {
      border-right: 0;
    }

    .pivot-demo-final tbody tr:last-child > *,
    .pivot-demo-final .touch-footer {
      border-bottom: 0;
    }

    .pivot-demo-final th { text-align: left; }
    .pivot-demo-final td { text-align: right; }

    .pivot-demo-final thead {
      position: sticky;
      top: 0;
      z-index: 4;
    }

    .pivot-demo-final tfoot {
      position: sticky;
      bottom: 0;
      z-index: 4;
    }

    .pivot-demo-final thead th,
    .pivot-demo-final tfoot th,
    .pivot-demo-final tfoot td,
    .pivot-demo-final .stick {
      background: var(--bg-body, white);
    }

    .pivot-demo-final tfoot th,
    .pivot-demo-final tfoot td {
      border-top: 1px solid #999;
    }

    .pivot-demo-final .stick {
      position: sticky;
      z-index: 2;
    }

    .pivot-demo-final .left-1 {
      left: 0;
      border-left: 1px solid #999;
      width: var(--c1);
      min-width: var(--c1);
      max-width: var(--c1);
    }

    .pivot-demo-final .left-2 {
      left: var(--c1);
      width: var(--c2);
      min-width: var(--c2);
      max-width: var(--c2);
    }

    .pivot-demo-final .right {
      right: 0;
      border-left: 1px solid #999;
      width: var(--total);
      min-width: var(--total);
      max-width: var(--total);
    }

    .pivot-demo-final .grand-label {
      left: 0;
      border-left: 1px solid #999;
      width: calc(var(--c1) + var(--c2));
      min-width: calc(var(--c1) + var(--c2));
      max-width: calc(var(--c1) + var(--c2));
      z-index: 5;
    }

    .pivot-demo-final thead .stick,
    .pivot-demo-final tfoot .right {
      z-index: 5;
    }
  </style>

  <div class="scroll">
    <table>
      <colgroup>
        <col class="c1">
        <col class="c2">
        <col span="6">
        <col class="ct">
      </colgroup>
      <thead>
        <tr>
          <th class="stick left-1" rowspan="2">Category</th>
          <th class="stick left-2" rowspan="2">Product</th>
          <th colspan="3">Q1</th>
          <th class="before-right" colspan="3">Q2</th>
          <th class="stick right" rowspan="2">Total</th>
        </tr>
        <tr>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th class="before-right">Jun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="stick left-1" rowspan="2">Fruit</th>
          <th class="stick left-2">Apples</th>
          <td>120</td><td>140</td><td>135</td><td>150</td><td>160</td><td class="before-right">170</td>
          <td class="stick right">875</td>
        </tr>
        <tr>
          <th class="stick left-2">Bananas</th>
          <td>90</td><td>100</td><td>95</td><td>110</td><td>115</td><td class="before-right">120</td>
          <td class="stick right">630</td>
        </tr>
        <tr>
          <th class="stick left-1" rowspan="2">Drinks</th>
          <th class="stick left-2">Tea</th>
          <td>60</td><td>65</td><td>70</td><td>75</td><td>80</td><td class="before-right">85</td>
          <td class="stick right">435</td>
        </tr>
        <tr>
          <th class="stick left-2">Coffee</th>
          <td>130</td><td>125</td><td>140</td><td>145</td><td>150</td><td class="before-right">155</td>
          <td class="stick right">845</td>
        </tr>
        <tr>
          <th class="stick left-1 touch-footer" rowspan="2">Snacks</th>
          <th class="stick left-2">Cookies</th>
          <td>75</td><td>80</td><td>85</td><td>90</td><td>95</td><td class="before-right">100</td>
          <td class="stick right">525</td>
        </tr>
        <tr>
          <th class="stick left-2">Chips</th>
          <td>95</td><td>90</td><td>100</td><td>105</td><td>110</td><td class="before-right">115</td>
          <td class="stick right">615</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="stick grand-label" colspan="2">Grand total</th>
          <td>570</td><td>600</td><td>625</td><td>675</td><td>710</td><td class="before-right">745</td>
          <td class="stick right">3925</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

## How the final shape works

The final shape is still one normal `<table>`. The scroll and sticky behavior come from CSS.

| Sticky area | Main CSS | Why we need it |
|---|---|---|
| Header | `thead { position: sticky; top: 0; }` | Keep month labels visible while scrolling down |
| First column | `.left-1 { left: 0; }` | Keep the category visible while scrolling sideways |
| Second column | `.left-2 { left: var(--c1); }` | Keep the product visible beside the category |
| Right Total column | `.right { right: 0; }` | Keep each row total visible while scrolling sideways |
| Bottom total row | `tfoot { position: sticky; bottom: 0; }` | Keep column totals visible while scrolling down |

The hard parts are not `position: sticky`. The hard parts are fixed column widths and clean borders.

<details markdown="1">
<summary>HTML pieces</summary>

| HTML | Why we need it |
|---|---|
| `<div class="pivot-demo pivot-demo-final">` | Scopes the demo CSS so it only affects this table |
| `<style>...</style>` | Keeps the example self-contained |
| `<div class="scroll">` | Creates the scroll container for horizontal and vertical scroll |
| `<table>` | Keeps the report semantic and table-like |
| `<colgroup>` | Gives real widths to the first, second, and total columns |
| `<col class="c1">` | Width source for the first sticky column |
| `<col class="c2">` | Width source for the second sticky column |
| `<col span="6">` | The six month columns |
| `<col class="ct">` | Width source for the right Total column |
| `<thead>` | Holds the sticky header rows |
| `rowspan="2"` | Makes `Category`, `Product`, and `Total` cover both header rows |
| `colspan="3"` | Makes `Q1` and `Q2` each cover three month columns |
| `<tbody>` | Holds the category and product rows |
| `rowspan="2"` on categories | Merges one category label across two products |
| `<tfoot>` | Holds the sticky Grand total row |
| `.stick` | Marks a cell as sticky |
| `.left-1` | Pins a cell to the first sticky column |
| `.left-2` | Pins a cell to the second sticky column |
| `.right` | Pins a cell to the right Total column |
| `.grand-label` | Pins the bottom-left Grand total label |
| `.before-right` | Removes the normal border before the sticky Total column |
| `.touch-footer` | Removes the bottom border from a rowspanning cell that touches the footer |

</details>

<details markdown="1">
<summary>CSS pieces</summary>

| CSS | Why we need it |
|---|---|
| `--c1`, `--c2`, `--total` | Store important column widths in one place |
| `.scroll { max-height: 18rem; overflow: auto; }` | Creates the scroll box |
| `border-collapse: separate` | Avoids sticky-border bugs from collapsed borders |
| `border-spacing: 0` | Keeps the table looking like one clean grid |
| `table-layout: fixed` | Makes column widths predictable |
| `width` and `min-width` | Makes the table wide enough to scroll |
| `.c1`, `.c2`, `.ct` | Applies fixed widths through `<colgroup>` |
| `border-right` and `border-bottom` | Draws most grid lines |
| `thead tr:first-child th { border-top: 1px solid #999; }` | Draws the top edge of the table |
| `.before-right { border-right: 0; }` | Prevents a double border beside the sticky Total column |
| `tbody tr:last-child > * { border-bottom: 0; }` | Prevents a double border above the sticky footer |
| `.touch-footer { border-bottom: 0; }` | Fixes the same footer border issue for `rowspan` cells |
| `thead { position: sticky; top: 0; }` | Makes the header stick to the top |
| `tfoot { position: sticky; bottom: 0; }` | Makes the Grand total row stick to the bottom |
| `background: var(--bg-body, white)` | Stops scrolled cells from showing through sticky cells |
| `.stick { position: sticky; }` | Shared sticky behavior for individual cells |
| `.left-1 { left: 0; }` | Pins the first column |
| `.left-2 { left: var(--c1); }` | Pins the second column after the first column |
| `.right { right: 0; }` | Pins the Total column to the right edge |
| `.grand-label { width: calc(var(--c1) + var(--c2)); }` | Makes the Grand total label cover both left sticky columns |
| `z-index` | Keeps sticky intersections above normal cells |

</details>

<details markdown="1">
<summary>Why the border fixes are necessary</summary>

Sticky tables are easy to make messy because sticky cells sit above scrolling cells.

`border-collapse: collapse` looks simpler, but with sticky cells the borders can appear to move with the scrolling table. `border-collapse: separate` plus `border-spacing: 0` gives us a clean grid while keeping each border attached to a real cell.

The Total column draws its own left border. That is why the cell before it uses `.before-right`: without it, you see two borders touching each other.

The sticky footer draws its own top border. That is why the last body row removes its bottom border. If a `rowspan` cell reaches the footer, add `.touch-footer` to that cell too.

</details>

## Step 1: Make a normal table

Start with the data. Use `<th>` for labels and `<td>` for numbers.

```html
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Product</th>
      <th>Jan</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Fruit</th>
      <th>Apples</th>
      <td>120</td>
      <td>120</td>
    </tr>
  </tbody>
</table>
```

## Step 2: Merge cells with HTML

CSS does not merge table cells. HTML does.

Use `colspan` to stretch across columns:

```html
<tr>
  <th rowspan="2">Category</th>
  <th rowspan="2">Product</th>
  <th colspan="3">Q1</th>
  <th rowspan="2">Total</th>
</tr>
<tr>
  <th>Jan</th>
  <th>Feb</th>
  <th>Mar</th>
</tr>
```

Use `rowspan` to stretch down rows:

```html
<tr>
  <th rowspan="2">Fruit</th>
  <th>Apples</th>
  <td>120</td>
</tr>
<tr>
  <th>Bananas</th>
  <td>90</td>
</tr>
```

## Step 3: Add scroll before sticky

Wide tables should scroll inside a box. The page itself should not become wider.

```html
<div class="scroll">
  <table>...</table>
</div>
```

```css
.scroll {
  overflow: auto;
}

table {
  min-width: 880px;
}

th,
td {
  white-space: nowrap;
}
```

If you also want vertical scrolling, add `max-height` to the wrapper.

## Step 4: Use the sticky border pattern

This is the minimized CSS pattern behind the final table.

<details markdown="1">
<summary>Show the full sticky CSS pattern</summary>

First, lock the sticky column widths with `<colgroup>`:

```html
<colgroup>
  <col class="c1">
  <col class="c2">
  <col span="6">
  <col class="ct">
</colgroup>
```

```css
.pivot {
  --c1: 6rem;
  --c2: 7rem;
  --total: 5.5rem;
}

.pivot .scroll {
  max-height: 18rem;
  overflow: auto;
}

.pivot table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 880px;
}

.pivot .c1 { width: var(--c1); }
.pivot .c2 { width: var(--c2); }
.pivot .ct { width: var(--total); }

.pivot th,
.pivot td {
  border: 0;
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 0.35rem 0.5rem;
  white-space: nowrap;
}

.pivot thead { position: sticky; top: 0; z-index: 4; }
.pivot tfoot { position: sticky; bottom: 0; z-index: 4; }

.pivot thead th,
.pivot tfoot th,
.pivot tfoot td,
.pivot .stick {
  background: white;
}

.pivot .stick { position: sticky; z-index: 2; }
.pivot .left-1 { left: 0; width: var(--c1); min-width: var(--c1); max-width: var(--c1); }
.pivot .left-2 { left: var(--c1); width: var(--c2); min-width: var(--c2); max-width: var(--c2); }
.pivot .right { right: 0; width: var(--total); min-width: var(--total); max-width: var(--total); border-left: 1px solid #999; }
.pivot .grand-label { left: 0; width: calc(var(--c1) + var(--c2)); min-width: calc(var(--c1) + var(--c2)); max-width: calc(var(--c1) + var(--c2)); }

.pivot .before-right { border-right: 0; }
.pivot tfoot th,
.pivot tfoot td { border-top: 1px solid #999; }
.pivot tbody tr:last-child > *,
.pivot .touch-footer { border-bottom: 0; }
```

</details>

The important border fixes are `before-right`, `border-top` on the footer, and `touch-footer` for a rowspanning cell that reaches the footer.

## Step 5: Add the sticky classes

The classes are boring, but they make the table predictable.

```html
<th class="stick left-1" rowspan="2">Category</th>
<th class="stick left-2">Apples</th>
<td class="before-right">170</td>
<td class="stick right">875</td>
<th class="stick grand-label" colspan="2">Grand total</th>
```

Use `touch-footer` only when a `rowspan` cell reaches the footer but starts before the last row:

```html
<th class="stick left-1 touch-footer" rowspan="2">Snacks</th>
```

## Checklist

- Use `<table>`, not divs.
- Use `colspan` and `rowspan` for merged cells.
- Put scroll on a wrapper.
- Use fixed widths for sticky columns.
- Use `border-collapse: separate` for sticky tables.
- Give sticky cells a background.
- Let sticky footer and sticky total cells draw their own borders.

That is enough for a readable static pivot table with only HTML and CSS.
