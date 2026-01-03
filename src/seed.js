export const seedSQL = `
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS campaign_touches;
DROP TABLE IF EXISTS ad_spend_daily;
DROP TABLE IF EXISTS campaigns;

DROP TABLE IF EXISTS refunds;
DROP TABLE IF EXISTS payments;

DROP TABLE IF EXISTS pageviews;
DROP TABLE IF EXISTS sessions;

DROP TABLE IF EXISTS subscription_events;
DROP TABLE IF EXISTS subscriptions;

DROP TABLE IF EXISTS ticket_comments;
DROP TABLE IF EXISTS support_tickets;

DROP TABLE IF EXISTS customer_success_assignments;
DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS fx_rates_daily;
DROP TABLE IF EXISTS geo_countries;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  region TEXT NOT NULL,
  country_code TEXT NOT NULL,
  signup_date TEXT NOT NULL,
  company_size INTEGER NOT NULL,
  industry TEXT NOT NULL,
  acquisition_channel TEXT NOT NULL
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_usd REAL NOT NULL,
  is_recurring INTEGER NOT NULL
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT NOT NULL,
  discount_pct REAL NOT NULL DEFAULT 0.0,
  currency TEXT NOT NULL DEFAULT 'USD',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE geo_countries (
  country_code TEXT PRIMARY KEY,
  country_name TEXT NOT NULL,
  region TEXT NOT NULL,
  currency TEXT NOT NULL
);

CREATE TABLE fx_rates_daily (
  rate_date TEXT NOT NULL,
  currency TEXT NOT NULL,
  usd_rate REAL NOT NULL,
  PRIMARY KEY (rate_date, currency)
);

CREATE TABLE subscriptions (
  subscription_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  status TEXT NOT NULL,
  billing_period TEXT NOT NULL,
  mrr_usd REAL NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE subscription_events (
  event_id INTEGER PRIMARY KEY,
  subscription_id INTEGER NOT NULL,
  event_date TEXT NOT NULL,
  event_type TEXT NOT NULL,
  old_mrr_usd REAL,
  new_mrr_usd REAL,
  note TEXT,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id)
);

CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  payment_date TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE refunds (
  refund_id INTEGER PRIMARY KEY,
  payment_id INTEGER NOT NULL,
  refund_date TEXT NOT NULL,
  amount_usd REAL NOT NULL,
  reason TEXT NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

CREATE TABLE sessions (
  session_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  session_start TEXT NOT NULL,
  source TEXT NOT NULL,
  device_type TEXT NOT NULL,
  country_code TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE pageviews (
  pageview_id INTEGER PRIMARY KEY,
  session_id INTEGER NOT NULL,
  view_time TEXT NOT NULL,
  page TEXT NOT NULL,
  duration_sec INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(session_id)
);

CREATE TABLE support_tickets (
  ticket_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  closed_at TEXT,
  priority TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  satisfaction_score INTEGER,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE ticket_comments (
  comment_id INTEGER PRIMARY KEY,
  ticket_id INTEGER NOT NULL,
  comment_time TEXT NOT NULL,
  author_type TEXT NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(ticket_id)
);

CREATE TABLE campaigns (
  campaign_id INTEGER PRIMARY KEY,
  campaign_name TEXT NOT NULL,
  channel TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT
);

CREATE TABLE ad_spend_daily (
  spend_date TEXT NOT NULL,
  campaign_id INTEGER NOT NULL,
  spend_usd REAL NOT NULL,
  clicks INTEGER NOT NULL,
  impressions INTEGER NOT NULL,
  PRIMARY KEY (spend_date, campaign_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

CREATE TABLE campaign_touches (
  touch_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  campaign_id INTEGER NOT NULL,
  touch_time TEXT NOT NULL,
  touch_type TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  manager_id INTEGER,
  region TEXT NOT NULL,
  hired_date TEXT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

CREATE TABLE customer_success_assignments (
  assignment_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  employee_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

/* ---- Seed data ---- */
INSERT INTO geo_countries(country_code,country_name,region,currency) VALUES
('US','United States','NA','USD'),
('CA','Canada','NA','CAD'),
('GB','United Kingdom','EU','GBP'),
('DE','Germany','EU','EUR'),
('FR','France','EU','EUR'),
('IN','India','APAC','INR'),
('JP','Japan','APAC','JPY'),
('AU','Australia','APAC','AUD'),
('BR','Brazil','LATAM','BRL');

INSERT INTO fx_rates_daily(rate_date,currency,usd_rate) VALUES
('2025-03-01','USD',1.000),
('2025-03-01','EUR',1.09),
('2025-03-01','GBP',1.27),
('2025-03-01','JPY',0.0067),
('2025-03-01','INR',0.012),
('2025-03-01','AUD',0.66),
('2025-03-01','BRL',0.20),
('2025-03-01','CAD',0.74);

INSERT INTO customers (customer_id, name, email, region, country_code, signup_date, company_size, industry, acquisition_channel) VALUES
(1,'Alice','alice@acme.com','NA','US','2025-01-05',52,'SaaS','Organic'),
(2,'Bob','bob@northwind.co','EU','GB','2025-01-10',18,'Retail','Paid Search'),
(3,'Charlie','charlie@finpro.io','NA','CA','2025-02-01',240,'Finance','Partner'),
(4,'Diana','diana@medico.org','APAC','IN','2025-02-12',120,'Health','Paid Social'),
(5,'Ethan','ethan@eduplus.edu','EU','DE','2025-02-18',80,'Edu','Referral'),
(6,'Fatima','fatima@logix.ai','NA','US','2025-03-02',36,'Logistics','Organic'),
(7,'Gwen','gwen@playworld.gg','APAC','JP','2025-03-10',14,'Gaming','Paid Social'),
(8,'Hiro','hiro@zenops.com','APAC','AU','2025-03-22',410,'SaaS','Event');

INSERT INTO products (product_id, product_name, category, price_usd, is_recurring) VALUES
(1,'Starter Plan','Subscription',29.00,1),
(2,'Pro Plan','Subscription',79.00,1),
(3,'Enterprise Plan','Subscription',199.00,1),
(4,'Analytics Add-on','Add-on',25.00,1),
(5,'Automation Add-on','Add-on',35.00,1),
(6,'Onboarding Service','Service',300.00,0);

INSERT INTO orders (order_id, customer_id, product_id, order_date, quantity, status, discount_pct, currency) VALUES
(101,1,2,'2025-03-01',1,'paid',0,'USD'),
(102,1,4,'2025-03-03',1,'paid',10,'USD'),
(103,2,1,'2025-03-04',1,'paid',0,'GBP'),
(104,2,5,'2025-03-10',2,'paid',0,'GBP'),
(105,3,2,'2025-03-12',1,'refunded',0,'USD'),
(106,3,4,'2025-03-14',1,'paid',0,'USD'),
(107,4,3,'2025-03-15',1,'paid',15,'INR'),
(108,4,6,'2025-03-16',1,'paid',0,'INR'),
(109,5,2,'2025-03-18',1,'paid',0,'EUR'),
(110,6,1,'2025-03-20',3,'paid',0,'USD'),
(111,6,4,'2025-03-22',1,'paid',0,'USD'),
(112,7,2,'2025-03-25',1,'paid',0,'JPY'),
(113,8,1,'2025-03-26',1,'paid',0,'AUD'),
(114,8,5,'2025-03-27',1,'failed',0,'AUD');

CREATE INDEX IF NOT EXISTS idx_orders_customer_date ON orders(customer_id, order_date);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
`;
