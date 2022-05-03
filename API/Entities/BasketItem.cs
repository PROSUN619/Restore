using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation property
        public int ProductId { get; set; }
        public Product Product { get; set; } // add foreign key refer to product table
        public int BasketId { get; set; }
        public Basket Basket { get; set; } // add foreign key refer to product table
    }
}