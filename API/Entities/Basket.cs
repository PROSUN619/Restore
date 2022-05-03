using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        // add foreign key to basketitem that refer to product table
        //if we do not mention in the BasketItem entity then it will creeate a nullable 
        //foreign key relation
        //to avoid that use navigation property (note 1) type relationship

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem{Product = product, Quantity = quantity});
            }

            var existingItem = Items.FirstOrDefault(Items => Items.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}