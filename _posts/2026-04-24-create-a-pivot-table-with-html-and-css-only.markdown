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
- The CSS only handles structure, not decoration.

Here is the final shape:

<div class="pivot-demo pivot-demo-final">
  <style>
    .pivot-demo-final .table-scroll {
      overflow-x: auto;
    }

    .pivot-demo-final table {
      border-collapse: collapse;
      min-width: 760px;
    }

    .pivot-demo-final th,
    .pivot-demo-final td {
      border: 1px solid #999;
      padding: 0.4rem 0.6rem;
      white-space: nowrap;
    }

    .pivot-demo-final th {
      text-align: left;
    }

    .pivot-demo-final td {
      text-align: right;
    }

    .pivot-demo-final thead th {
      vertical-align: bottom;
    }

    .pivot-demo-final tbody th {
      vertical-align: top;
    }
  </style>

  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th scope="col" rowspan="2">Category</th>
          <th scope="col" rowspan="2">Product</th>
          <th scope="colgroup" colspan="3">Q1</th>
          <th scope="colgroup" colspan="3">Q2</th>
          <th scope="col" rowspan="2">Total</th>
        </tr>
        <tr>
          <th scope="col">Jan</th>
          <th scope="col">Feb</th>
          <th scope="col">Mar</th>
          <th scope="col">Apr</th>
          <th scope="col">May</th>
          <th scope="col">Jun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="rowgroup" rowspan="2">Fruit</th>
          <th scope="row">Apples</th>
          <td>120</td>
          <td>140</td>
          <td>135</td>
          <td>150</td>
          <td>160</td>
          <td>170</td>
          <td>875</td>
        </tr>
        <tr>
          <th scope="row">Bananas</th>
          <td>90</td>
          <td>100</td>
          <td>95</td>
          <td>110</td>
          <td>115</td>
          <td>120</td>
          <td>630</td>
        </tr>
        <tr>
          <th scope="rowgroup" rowspan="2">Drinks</th>
          <th scope="row">Tea</th>
          <td>60</td>
          <td>65</td>
          <td>70</td>
          <td>75</td>
          <td>80</td>
          <td>85</td>
          <td>435</td>
        </tr>
        <tr>
          <th scope="row">Coffee</th>
          <td>130</td>
          <td>125</td>
          <td>140</td>
          <td>145</td>
          <td>150</td>
          <td>155</td>
          <td>845</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="2">Grand total</th>
          <td>400</td>
          <td>430</td>
          <td>440</td>
          <td>480</td>
          <td>505</td>
          <td>530</td>
          <td>2785</td>
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
Category | Product | Q1 months | Q2 months | Total
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

This is the full example in one block. The CSS is scoped by starting every selector with `.pivot-example`, so it only affects this example.

```html
<div class="pivot-example">
  <style>
    .pivot-example .table-scroll {
      overflow-x: auto;
    }

    .pivot-example table {
      border-collapse: collapse;
      min-width: 760px;
    }

    .pivot-example th,
    .pivot-example td {
      border: 1px solid #999;
      padding: 0.4rem 0.6rem;
      white-space: nowrap;
    }

    .pivot-example th {
      text-align: left;
    }

    .pivot-example td {
      text-align: right;
    }

    .pivot-example thead th {
      vertical-align: bottom;
    }

    .pivot-example tbody th {
      vertical-align: top;
    }
  </style>

  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th scope="col" rowspan="2">Category</th>
          <th scope="col" rowspan="2">Product</th>
          <th scope="colgroup" colspan="3">Q1</th>
          <th scope="colgroup" colspan="3">Q2</th>
          <th scope="col" rowspan="2">Total</th>
        </tr>
        <tr>
          <th scope="col">Jan</th>
          <th scope="col">Feb</th>
          <th scope="col">Mar</th>
          <th scope="col">Apr</th>
          <th scope="col">May</th>
          <th scope="col">Jun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="rowgroup" rowspan="2">Fruit</th>
          <th scope="row">Apples</th>
          <td>120</td>
          <td>140</td>
          <td>135</td>
          <td>150</td>
          <td>160</td>
          <td>170</td>
          <td>875</td>
        </tr>
        <tr>
          <th scope="row">Bananas</th>
          <td>90</td>
          <td>100</td>
          <td>95</td>
          <td>110</td>
          <td>115</td>
          <td>120</td>
          <td>630</td>
        </tr>
        <tr>
          <th scope="rowgroup" rowspan="2">Drinks</th>
          <th scope="row">Tea</th>
          <td>60</td>
          <td>65</td>
          <td>70</td>
          <td>75</td>
          <td>80</td>
          <td>85</td>
          <td>435</td>
        </tr>
        <tr>
          <th scope="row">Coffee</th>
          <td>130</td>
          <td>125</td>
          <td>140</td>
          <td>145</td>
          <td>150</td>
          <td>155</td>
          <td>845</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colspan="2">Grand total</th>
          <td>400</td>
          <td>430</td>
          <td>440</td>
          <td>480</td>
          <td>505</td>
          <td>530</td>
          <td>2785</td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
```

## Optional: sticky headers

If the table is tall or wide, sticky headers can help. This is optional. It adds behavior, not calculation.

```css
.pivot-example thead th {
  position: sticky;
  top: 0;
  background: white;
}

.pivot-example tbody th:first-child,
.pivot-example tfoot th:first-child {
  position: sticky;
  left: 0;
  background: white;
}
```

Use a background color with sticky cells. Without it, text from scrolling cells can show through underneath.

## The small checklist

When you build your own table, check this list:

- Use `<table>`, `<thead>`, `<tbody>`, and `<tfoot>`.
- Use `<th>` for row and column labels.
- Use `<td>` for numbers or values.
- Use `colspan` to merge cells across columns.
- Use `rowspan` to merge cells down rows.
- Put wide tables inside a scroll wrapper.
- Use `border-collapse: collapse` for clean grid lines.
- Use `white-space: nowrap` if labels wrap too much.

That is enough to create a clear pivot-table layout with HTML and CSS alone.
