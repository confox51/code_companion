// Code examples for different languages
export const getExampleCode = (language: string): string => {
  switch (language) {
    case 'javascript':
      return `function calculateTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  // Apply discount if total is over $100
  if (total >= 100) {
    total = total * 0.9;
  }
  
  return total;
}`;

    case 'typescript':
      return `interface Item {
  name: string;
  price: number;
}

function calculateTotal(items: Item[]): number {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  // Apply discount if total is over $100
  if (total >= 100) {
    total = total * 0.9;
  }
  
  return total;
}`;

    case 'python':
      return `def calculate_total(items):
    total = 0
    
    for item in items:
        total += item['price']
    
    # Apply discount if total is over $100
    if total >= 100:
        total = total * 0.9
    
    return total`;

    case 'java':
      return `import java.util.List;

public class ShoppingCart {
    public double calculateTotal(List<Item> items) {
        double total = 0;
        
        for (int i = 0; i < items.size(); i++) {
            total += items.get(i).getPrice();
        }
        
        // Apply discount if total is over $100
        if (total >= 100) {
            total = total * 0.9;
        }
        
        return total;
    }
}`;

    case 'csharp':
      return `using System;
using System.Collections.Generic;

public class ShoppingCart
{
    public double CalculateTotal(List<Item> items)
    {
        double total = 0;
        
        for (int i = 0; i < items.Count; i++)
        {
            total += items[i].Price;
        }
        
        // Apply discount if total is over $100
        if (total >= 100)
        {
            total = total * 0.9;
        }
        
        return total;
    }
}`;

    case 'php':
      return `<?php
function calculateTotal($items) {
    $total = 0;
    
    foreach ($items as $item) {
        $total += $item['price'];
    }
    
    // Apply discount if total is over $100
    if ($total >= 100) {
        $total = $total * 0.9;
    }
    
    return $total;
}
?>`;

    case 'css':
      return `.button {
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.button:hover {
  background-color: darkblue;
}

@media (max-width: 600px) {
  .button {
    width: 100%;
  }
}`;

    case 'html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
    <button>Click Me</button>
  </div>
</body>
</html>`;

    default:
      return `// Enter your code here`;
  }
};
