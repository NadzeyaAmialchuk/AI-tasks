
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

DELETE FROM orders;

INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');


SELECT 
    'Total sales for March 2024' AS metric,
    SUM(amount) AS value,
    '27,000 (expected)' AS expected
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';


SELECT 
    'Top-spending customer' AS metric,
    customer || ' (' || SUM(amount) || ')' AS value,
    'Alice (20,000) (expected)' AS expected
FROM orders
GROUP BY customer
ORDER BY SUM(amount) DESC
LIMIT 1;


SELECT 
    'Average order value (last 3 months)' AS metric,
    SUM(amount) / COUNT(*) AS value,
    '6,000 (expected)' AS expected
FROM orders
WHERE order_date >= date('2024-02-01') 
  AND order_date <= date('2024-04-30');

SELECT 'All orders' AS title;
SELECT * FROM orders ORDER BY order_date;