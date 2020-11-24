<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => 'Ivan',
            'surname' => $this->faker->lastName,
            'phone_number' => '+7(918)123-12-23',
            'password' => bcrypt('1q2w3e4r'),
            'account_type' => 'user'
        ];
    }
}
