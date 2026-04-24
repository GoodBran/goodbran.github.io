---
layout: post
title: "Create a Pivot Table with HTML and CSS Only"
date: 2026-04-24 12:00:00 +0800
description: "A beginner-friendly guide to building a static pivot-table layout with only HTML and CSS, focusing on scroll, borders, and merged cells."
---

You can build the shape of a pivot table with plain HTML and CSS. The important tools are `<table>`, `colspan`, `rowspan`, `border-collapse`, borders, and a scroll wrapper.

One important limit first: HTML and CSS do not calculate totals or rearrange raw data. A real spreadsheet pivot table can group data for you. This tutorial makes a static pivot table, which means you already know the rows, columns, and numbers you want to show.

That is still useful for reports, dashboards, invoices, score sheets, and any page where the data is prepared somewhere else.

## What we are building

We will make a small sales table where:

- Rows are grouped by category.
- Columns are grouped by quarter.
- Some header cells are merged.
- The table can scroll horizontally on small screens.
- The headers, first two columns, right Total column, and bottom Grand total row stay visible while scrolling.
- The CSS only handles structure, not decoration.

Here is the final shape:

<div class="pivot-demo pivot-demo-final">
  <style>
    .pivot-demo-final {
      --category-column-width: 7rem;
      --product-column-width: 7rem;
      --total-column-width: 6rem;
    }

    .pivot-demo-final .table-scroll {
      max-height: 18rem;
      overflow: auto;
    }

    .pivot-demo-final table {
      border-collapse: separate;
      border-spacing: 0;
      table-layout: fixed;
      width: 1220px;
      min-width: 1220px;
    }

    .pivot-demo-final .category-column {
      width: var(--category-column-width);
    }

    .pivot-demo-final .product-column {
      width: var(--product-column-width);
    }

    .pivot-demo-final .total-column {
      width: var(--total-column-width);
    }

    .pivot-demo-final th,
    .pivot-demo-final td {
      border: 0;
      border-right: 1px solid #999;
      border-bottom: 1px solid #999;
      padding: 0.4rem 0.6rem;
      line-height: 1.4;
      white-space: nowrap;
    }

    .pivot-demo-final thead tr:first-child th {
      border-top: 1px solid #999;
    }

    .pivot-demo-final thead tr:first-child th:nth-last-child(2),
    .pivot-demo-final thead tr:last-child th:last-child,
    .pivot-demo-final tbody tr > :nth-last-child(2),
    .pivot-demo-final tfoot tr > :nth-last-child(2) {
      border-right: 0;
    }

    .pivot-demo-final tbody tr:last-child th,
    .pivot-demo-final tbody tr:last-child td {
      border-bottom: 0;
    }

    .pivot-demo-final .touches-footer {
      border-bottom: 0;
    }

    .pivot-demo-final th {
      text-align: left;
    }

    .pivot-demo-final td {
      text-align: right;
    }

    .pivot-demo-final .sticky-col,
    .pivot-demo-final .sticky-right,
    .pivot-demo-final .sticky-grand-total,
    .pivot-demo-final .sticky-total {
      position: sticky;
      background: var(--bg-body, white);
    }

    .pivot-demo-final .sticky-col-1 {
      left: 0;
      border-left: 1px solid #999;
      width: var(--category-column-width);
      min-width: var(--category-column-width);
      max-width: var(--category-column-width);
      z-index: 2;
    }

    .pivot-demo-final .sticky-col-2 {
      left: var(--category-column-width);
      width: var(--product-column-width);
      min-width: var(--product-column-width);
      max-width: var(--product-column-width);
      z-index: 2;
    }

    .pivot-demo-final .sticky-right {
      right: 0;
      border-left: 1px solid #999;
      width: var(--total-column-width);
      min-width: var(--total-column-width);
      max-width: var(--total-column-width);
      z-index: 2;
    }

    .pivot-demo-final .sticky-grand-total {
      left: 0;
      border-left: 1px solid #999;
      width: calc(var(--category-column-width) + var(--product-column-width));
      min-width: calc(var(--category-column-width) + var(--product-column-width));
      max-width: calc(var(--category-column-width) + var(--product-column-width));
      z-index: 5;
    }

    .pivot-demo-final thead {
      position: sticky;
      top: 0;
      z-index: 3;
    }

    .pivot-demo-final thead th {
      background: var(--bg-body, white);
      vertical-align: bottom;
    }

    .pivot-demo-final tfoot {
      position: sticky;
      bottom: 0;
      z-index: 4;
    }

    .pivot-demo-final tfoot th,
    .pivot-demo-final tfoot td {
      background: var(--bg-body, white);
      border-top: 1px solid #999;
    }

    .pivot-demo-final thead .sticky-col,
    .pivot-demo-final thead .sticky-right,
    .pivot-demo-final tfoot .sticky-right {
      z-index: 4;
    }

    .pivot-demo-final tbody th {
      vertical-align: top;
    }
  </style>

  <div class="table-scroll">
    <table>
      <colgroup>
        <col class="category-column">
        <col class="product-column">
        <col span="12">
        <col class="total-column">
      </colgroup>
      <thead>
        <tr>
          <th class="sticky-col sticky-col-1" scope="col" rowspan="2">Category</th>
          <th class="sticky-col sticky-col-2" scope="col" rowspan="2">Product</th>
          <th scope="colgroup" colspan="3">Q1</th>
          <th scope="colgroup" colspan="3">Q2</th>
          <th scope="colgroup" colspan="3">Q3</th>
          <th scope="colgroup" colspan="3">Q4</th>
          <th class="sticky-right" scope="col" rowspan="2">Total</th>
        </tr>
        <tr>
          <th scope="col">Jan</th>
          <th scope="col">Feb</th>
          <th scope="col">Mar</th>
          <th scope="col">Apr</th>
          <th scope="col">May</th>
          <th scope="col">Jun</th>
          <th scope="col">Jul</th>
          <th scope="col">Aug</th>
          <th scope="col">Sep</th>
          <th scope="col">Oct</th>
          <th scope="col">Nov</th>
          <th scope="col">Dec</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th class="sticky-col sticky-col-1" scope="rowgroup" rowspan="2">Fruit</th>
          <th class="sticky-col sticky-col-2" scope="row">Apples</th>
          <td>120</td>
          <td>140</td>
          <td>135</td>
          <td>150</td>
          <td>160</td>
          <td>170</td>
          <td>180</td>
          <td>175</td>
          <td>190</td>
          <td>200</td>
          <td>210</td>
          <td>220</td>
          <td class="sticky-right">2050</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-2" scope="row">Bananas</th>
          <td>90</td>
          <td>100</td>
          <td>95</td>
          <td>110</td>
          <td>115</td>
          <td>120</td>
          <td>125</td>
          <td>130</td>
          <td>128</td>
          <td>135</td>
          <td>140</td>
          <td>145</td>
          <td class="sticky-right">1433</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-1" scope="rowgroup" rowspan="2">Drinks</th>
          <th class="sticky-col sticky-col-2" scope="row">Tea</th>
          <td>60</td>
          <td>65</td>
          <td>70</td>
          <td>75</td>
          <td>80</td>
          <td>85</td>
          <td>90</td>
          <td>95</td>
          <td>100</td>
          <td>105</td>
          <td>110</td>
          <td>115</td>
          <td class="sticky-right">1050</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-2" scope="row">Coffee</th>
          <td>130</td>
          <td>125</td>
          <td>140</td>
          <td>145</td>
          <td>150</td>
          <td>155</td>
          <td>160</td>
          <td>165</td>
          <td>170</td>
          <td>175</td>
          <td>180</td>
          <td>185</td>
          <td class="sticky-right">1880</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-1" scope="rowgroup" rowspan="2">Snacks</th>
          <th class="sticky-col sticky-col-2" scope="row">Cookies</th>
          <td>75</td>
          <td>80</td>
          <td>85</td>
          <td>90</td>
          <td>95</td>
          <td>100</td>
          <td>105</td>
          <td>110</td>
          <td>115</td>
          <td>120</td>
          <td>125</td>
          <td>130</td>
          <td class="sticky-right">1230</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-2" scope="row">Chips</th>
          <td>95</td>
          <td>90</td>
          <td>100</td>
          <td>105</td>
          <td>110</td>
          <td>115</td>
          <td>120</td>
          <td>125</td>
          <td>130</td>
          <td>135</td>
          <td>140</td>
          <td>145</td>
          <td class="sticky-right">1410</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-1 touches-footer" scope="rowgroup" rowspan="2">Supplies</th>
          <th class="sticky-col sticky-col-2" scope="row">Bags</th>
          <td>40</td>
          <td>45</td>
          <td>50</td>
          <td>55</td>
          <td>60</td>
          <td>65</td>
          <td>70</td>
          <td>75</td>
          <td>80</td>
          <td>85</td>
          <td>90</td>
          <td>95</td>
          <td class="sticky-right">810</td>
        </tr>
        <tr>
          <th class="sticky-col sticky-col-2" scope="row">Cups</th>
          <td>55</td>
          <td>60</td>
          <td>62</td>
          <td>65</td>
          <td>70</td>
          <td>75</td>
          <td>78</td>
          <td>80</td>
          <td>85</td>
          <td>90</td>
          <td>95</td>
          <td>100</td>
          <td class="sticky-right">915</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="sticky-grand-total" scope="row" colspan="2">Grand total</th>
          <td>665</td>
          <td>705</td>
          <td>737</td>
          <td>795</td>
          <td>840</td>
          <td>885</td>
          <td>928</td>
          <td>955</td>
          <td>998</td>
          <td>1045</td>
          <td>1090</td>
          <td>1135</td>
          <td class="sticky-right">10778</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

## Step 1: Decide the rows and columns

Before writing HTML, decide three things:

- What goes down the left side? In this example: category and product.
- What goes across the top? In this example: quarters and months.
- What values go in the middle? In this example: sales numbers.

That is the pivot-table idea. Rows describe one direction. Columns describe another direction. The numbers sit where they meet.

For this tutorial, the table will use this structure:

```text
Category | Product | quarter months | Total
```

## Step 2: Start with a normal table

Start with the simplest possible table. Do not merge cells yet.

```html
<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Product</th>
      <th>Jan</th>
      <th>Feb</th>
      <th>Mar</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Fruit</th>
      <th>Apples</th>
      <td>120</td>
      <td>140</td>
      <td>135</td>
      <td>395</td>
    </tr>
  </tbody>
</table>
```

The most important rule is simple:

- Use `<th>` for labels.
- Use `<td>` for values.

The browser can display a table without CSS, but the cell lines will not look like one clean grid yet.

## Step 3: Add only the border CSS you need

For table borders, this is the important CSS:

```css
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #999;
  padding: 0.4rem 0.6rem;
}
```

`border-collapse: collapse` makes neighboring cell borders join into single lines. Without it, the table often looks like it has doubled borders or gaps.

Here is a small embedded example with the CSS scoped to this example only:

<div class="pivot-demo pivot-demo-borders">
  <style>
    .pivot-demo-borders table {
      border-collapse: collapse;
    }

    .pivot-demo-borders th,
    .pivot-demo-borders td {
      border: 1px solid #999;
      padding: 0.4rem 0.6rem;
    }
  </style>

  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Product</th>
        <th>Jan</th>
        <th>Feb</th>
        <th>Mar</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Fruit</th>
        <th>Apples</th>
        <td>120</td>
        <td>140</td>
        <td>135</td>
        <td>395</td>
      </tr>
    </tbody>
  </table>
</div>

## Step 4: Merge column headers with colspan

In a pivot table, one header often covers several smaller columns. For example, `Q1` covers `Jan`, `Feb`, and `Mar`.

Use `colspan="3"` when one cell should be as wide as three columns:

```html
<tr>
  <th rowspan="2">Category</th>
  <th rowspan="2">Product</th>
  <th colspan="3">Q1</th>
  <th colspan="3">Q2</th>
  <th rowspan="2">Total</th>
</tr>
<tr>
  <th>Jan</th>
  <th>Feb</th>
  <th>Mar</th>
  <th>Apr</th>
  <th>May</th>
  <th>Jun</th>
</tr>
```

Notice two things:

- `Q1` has `colspan="3"` because it covers three month columns.
- `Category`, `Product`, and `Total` have `rowspan="2"` because they cover two header rows.

Embedded example:

<div class="pivot-demo pivot-demo-colspan">
  <style>
    .pivot-demo-colspan .table-scroll {
      overflow-x: auto;
    }

    .pivot-demo-colspan table {
      border-collapse: collapse;
      min-width: 640px;
    }

    .pivot-demo-colspan th,
    .pivot-demo-colspan td {
      border: 1px solid #999;
      padding: 0.4rem 0.6rem;
      white-space: nowrap;
    }

    .pivot-demo-colspan td {
      text-align: right;
    }
  </style>

  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th rowspan="2">Category</th>
          <th rowspan="2">Product</th>
          <th colspan="3">Q1</th>
          <th colspan="3">Q2</th>
          <th rowspan="2">Total</th>
        </tr>
        <tr>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th>Jun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Fruit</th>
          <th>Apples</th>
          <td>120</td>
          <td>140</td>
          <td>135</td>
          <td>150</td>
          <td>160</td>
          <td>170</td>
          <td>875</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Step 5: Merge row labels with rowspan

Now group rows on the left. If `Fruit` contains two product rows, use `rowspan="2"`.

```html
<tr>
  <th rowspan="2">Fruit</th>
  <th>Apples</th>
  <td>120</td>
  <td>140</td>
  <td>135</td>
</tr>
<tr>
  <th>Bananas</th>
  <td>90</td>
  <td>100</td>
  <td>95</td>
</tr>
```

The `Fruit` cell appears once, but it covers two rows.

This is the main trick behind a pivot-table shape. CSS does not merge the cells. The HTML attributes `colspan` and `rowspan` do.

## Step 6: Add horizontal scroll

Pivot tables become wide very quickly. Do not let the table make the whole page wider. Put the table inside a wrapper and scroll the wrapper.

```html
<div class="table-scroll">
  <table>
    <!-- table rows here -->
  </table>
</div>
```

```css
.table-scroll {
  overflow-x: auto;
}

table {
  min-width: 760px;
}

th,
td {
  white-space: nowrap;
}
```

These three lines do most of the responsive work:

- `overflow-x: auto` gives the wrapper a horizontal scrollbar when needed.
- `min-width` keeps the table from squeezing until it is unreadable.
- `white-space: nowrap` keeps month names and numbers on one line.

## Step 7: Add total rows with colspan

For totals, you often want one label to cover multiple label columns.

Use `colspan="2"` when the total label should cover `Category` and `Product`:

```html
<tfoot>
  <tr>
    <th colspan="2">Grand total</th>
    <td>400</td>
    <td>430</td>
    <td>440</td>
    <td>480</td>
    <td>505</td>
    <td>530</td>
    <td>2785</td>
  </tr>
</tfoot>
```

This keeps the total row aligned with the rest of the table.

## Complete copy-paste version

This version keeps only the necessary parts: a scroll wrapper, collapsed borders, merged headers, merged row labels, and a total row.

```html
<div class="pivot-example">
  <style>
    .pivot-example .table-scroll {
      overflow-x: auto;
    }

    .pivot-example table {
      border-collapse: collapse;
      min-width: 520px;
    }

    .pivot-example th,
    .pivot-example td {
      border: 1px solid #999;
      padding: 0.4rem 0.6rem;
      white-space: nowrap;
    }
  </style>

  <div class="table-scroll">
    <table>
      <thead>
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
      </thead>
      <tbody>
        <tr>
          <th rowspan="2">Fruit</th>
          <th>Apples</th>
          <td>120</td>
          <td>140</td>
          <td>135</td>
          <td>395</td>
        </tr>
        <tr>
          <th>Bananas</th>
          <td>90</td>
          <td>100</td>
          <td>95</td>
          <td>285</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="2">Total</th>
          <td>210</td>
          <td>240</td>
          <td>230</td>
          <td>680</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

## Optional: sticky headers, columns, and totals

If the table is tall or wide, sticky headers and totals can help. This is optional. It adds behavior, not calculation.

Use classes for sticky columns. That is safer than `:first-child` when the table uses `rowspan`, because the first HTML child is not always the first visible column.

Also switch the sticky version from `border-collapse: collapse` to `border-collapse: separate` with `border-spacing: 0`. Collapsed table borders can paint as part of the scrolling table instead of the sticky cells, which is why borders may appear to slide underneath the frozen area.

One more detail matters: each sticky offset must match the real column width. The second sticky column's `left` value must match the first column width. The right sticky total column should also have a fixed width. Use `table-layout: fixed` and a `<colgroup>`.

```html
<table>
  <colgroup>
    <col class="first-column">
    <col class="second-column">
    <col span="12">
    <col class="total-column">
  </colgroup>
  <!-- thead, tbody, and tfoot here -->
</table>
```

```css
.pivot-example {
  --first-column-width: 7rem;
  --second-column-width: 7rem;
  --total-column-width: 6rem;
}

.pivot-example .table-scroll {
  max-height: 18rem;
  overflow: auto;
}

.pivot-example table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  width: 760px;
  min-width: 760px;
}

.pivot-example .first-column {
  width: var(--first-column-width);
}

.pivot-example .second-column {
  width: var(--second-column-width);
}

.pivot-example .total-column {
  width: var(--total-column-width);
}

.pivot-example th,
.pivot-example td {
  border: 0;
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
}

.pivot-example thead tr:first-child th {
  border-top: 1px solid #999;
}

.pivot-example thead tr:first-child th:nth-last-child(2),
.pivot-example thead tr:last-child th:last-child,
.pivot-example tbody tr > :nth-last-child(2),
.pivot-example tfoot tr > :nth-last-child(2) {
  border-right: 0;
}

.pivot-example tbody tr:last-child th,
.pivot-example tbody tr:last-child td {
  border-bottom: 0;
}

.pivot-example .touches-footer {
  border-bottom: 0;
}

.pivot-example thead {
  position: sticky;
  top: 0;
  z-index: 4;
}

.pivot-example tfoot {
  position: sticky;
  bottom: 0;
  z-index: 4;
}

.pivot-example thead th,
.pivot-example tfoot th,
.pivot-example tfoot td,
.pivot-example .sticky-col,
.pivot-example .sticky-right,
.pivot-example .sticky-grand-total {
  background: white;
}

.pivot-example tfoot th,
.pivot-example tfoot td {
  border-top: 1px solid #999;
}

.pivot-example .sticky-col,
.pivot-example .sticky-right,
.pivot-example .sticky-grand-total {
  position: sticky;
  z-index: 2;
}

.pivot-example .sticky-col-1 {
  left: 0;
  border-left: 1px solid #999;
  width: var(--first-column-width);
  min-width: var(--first-column-width);
  max-width: var(--first-column-width);
}

.pivot-example .sticky-col-2 {
  left: var(--first-column-width);
  width: var(--second-column-width);
  min-width: var(--second-column-width);
  max-width: var(--second-column-width);
}

.pivot-example .sticky-right {
  right: 0;
  border-left: 1px solid #999;
  width: var(--total-column-width);
  min-width: var(--total-column-width);
  max-width: var(--total-column-width);
}

.pivot-example .sticky-grand-total {
  left: 0;
  border-left: 1px solid #999;
  width: calc(var(--first-column-width) + var(--second-column-width));
  min-width: calc(var(--first-column-width) + var(--second-column-width));
  max-width: calc(var(--first-column-width) + var(--second-column-width));
  z-index: 5;
}
```

Add `sticky-col sticky-col-1` to first-column cells, `sticky-col sticky-col-2` to second-column cells, `sticky-right` to the right Total cells, and `sticky-grand-total` to the bottom-left Grand total cell. The cells before the sticky Total column remove their `border-right`, so the sticky Total column can draw one clean `border-left`. The sticky footer draws its own `border-top`, so the top line stays visible while the body scrolls behind it. If a `rowspan` cell reaches the footer but starts before the last `<tr>`, add `touches-footer` to remove its bottom border too.

## The small checklist

When you build your own table, check this list:

- Use `<table>`, `<thead>`, `<tbody>`, and `<tfoot>`.
- Use `<th>` for row and column labels.
- Use `<td>` for numbers or values.
- Use `colspan` to merge cells across columns.
- Use `rowspan` to merge cells down rows.
- Put wide tables inside a scroll wrapper.
- Use `border-collapse: collapse` for normal tables, or `border-collapse: separate` with `border-spacing: 0` for sticky tables.
- Use `white-space: nowrap` if labels wrap too much.

That is enough to create a clear pivot-table layout with HTML and CSS alone.
