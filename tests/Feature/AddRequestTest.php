<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AddRequestTest extends TestCase
{
    public function testProductSearch() {
        $response = $this->call('GET', '/api/product/search', ['query' => 'агро']);
        $response->assertStatus(200);
    }
}
