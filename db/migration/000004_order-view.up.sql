create or replace view v_orders as
select o.order_id,
    o.order_by as buyer_id,
    b.username as buyer_name,
    o.order_for as seller_id,
    s.username as seller_name,
    o.status,
    sum(oi.quantity * p.product_price) as price
from orders o
    join order_items oi on oi.order_id = o.order_id
    join products p on oi.product_id = p.product_id
    join users s on s.user_id = o.order_for
    join users b on b.user_id = o.order_by
group by o.order_id,
    b.username,
    s.username;