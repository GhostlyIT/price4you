<?php


namespace App\Services;


use App\Models\Fertiliser;
use App\Models\Product;
use App\Models\Seed;

class ProductService
{
    protected $product;

    public function __construct(int $id, string $type)
    {
        if ($type === 'seed') {
            $this->product = Seed::with('tara')->findOrFail($id);
            $this->product['type'] = 'Семена';
        } elseif ($type === 'fertiliser') {
            $this->product = Fertiliser::with('tara')->findOrFail($id);
            $this->product['type'] = 'Удобрения';
        } elseif ($type === 'product') {
            $this->product = Product::with('tara')->findOrFail($id);
            $this->product['type'] = 'Защита растений';

            if ($this->product->regdata()->first()) {
                $this->product['regdata'] = $this->product->regdata()->with('culture')->get();
            } elseif ($this->product->regdataForLph()->first()) {
                $this->product['regdata'] = $this->product->regdataForLph()->with('culture')->get();
            } elseif ($this->product->regdataForAvia()->first()) {
                $this->product['regdata'] = $this->product->regdataForAvia()->with('culture')->get();
            }

        } else {
            throw new \Exception('Товар не найден');
        }
    }

    public function getProduct()
    {
        return $this->product;
    }
}
