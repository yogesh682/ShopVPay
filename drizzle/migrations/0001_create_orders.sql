CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_group uuid NOT NULL,
  customer_id uuid NOT NULL,
  customer_name text NOT NULL DEFAULT '',
  product_id text NOT NULL,
  product_name text NOT NULL,
  product_image_url text NOT NULL DEFAULT '',
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL CHECK (unit_price >= 0),
  total_price numeric(12,2) NOT NULL CHECK (total_price >= 0),
  payment_method text NOT NULL DEFAULT 'vpay',
  payment_status text NOT NULL DEFAULT 'pending',
  order_status text NOT NULL DEFAULT 'confirmed',
  phone text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  order_date timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers view own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = customer_id);
CREATE POLICY "Customers create own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = customer_id);
CREATE INDEX orders_customer_date_idx ON public.orders (customer_id, order_date DESC);