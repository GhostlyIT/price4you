<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;

class AuthTest extends TestCase
{
    use DatabaseTransactions;

    protected $userFields = [
        'name' => 'Иван',
        'surname' => 'Иванов',
        'phone_number' => '+7(918)123-12-23',
        'password' => '1q2w3e4r',
        'account_type' => 'user',
        'company_name' => 'ООО "Компания"',
        'company_address' => 'Ул. Пушкина, д. 12',
        'email' => 'company@gmail.com',
        'director' => 'Петров В.В.'
    ];

    public function testRegisterAccountTypeFailure()
    {
        $accountTypes = [
            'qwerty', 'wasd', '<script>alert("HACK")</script>', 'user'
        ];

        foreach ($accountTypes as $type) {
            $this->userFields['account_type'] = $type;

            $response = $this->postJson('/api/register', $this->userFields);

            if ($type === 'user') {
                $response->assertJson([
                    'status' => 'success'
                ]);
                $response->assertStatus(200);
            } else {
                $response->assertJson([
                    'status' => 'error'
                ]);
                $response->assertStatus(422);
            }
        }
    }

    public function testRegisterPhoneFailure() {
        $phoneNumbers = [
            '+79181231223',
            'asdawdas',
            '888391283',
            '123',
            '+7(918)-123-12-23'
        ];
        $this->userFields['phone_number'] = '+79181231223';

        $response = $this->postJson('/api/register', $this->userFields);

        $response->assertJson([
            'message' => 'Поле phone number имеет ошибочный формат.'
        ]);

        foreach ($phoneNumbers as $phoneNumber) {
            $this->userFields['phone_number'] = $phoneNumber;

            $response = $this->postJson('/api/register', $this->userFields);

            if ($phoneNumber !== '+7(918)-123-12-23') {
                $response->assertJson([
                    'status' => 'error'
                ]);
                $response->assertStatus(422);
            } else {
                $response->assertJson([
                    'status' => 'success'
                ]);
                $response->assertStatus(200);
            }
        }
    }

    public function testCompanyNotCreatedWithoutCompanyName() {
        $this->userFields['account_type'] = 'company';
        $this->userFields['company_name'] = '';

        $response = $this->postJson('/api/register', $this->userFields);

        $response->assertJson([
            'status' => 'error'
        ]);
        $response->assertStatus(422);
        $this->assertDatabaseMissing('companies', [
            'email' => $this->userFields['email']
        ]);
    }

    public function testCompanyNotCreatedWithInvalidEmail() {
        $this->userFields['account_type'] = 'company';
        $this->userFields['email'] = 'asdqqwee123';

        $response = $this->postJson('/api/register', $this->userFields);

        $response->assertJson([
            'status' => 'error'
        ]);
        $response->assertStatus(422);
        $this->assertDatabaseMissing('companies', [
            'email' => $this->userFields['email']
        ]);
    }

    public function testCompanySuccessfullyCreated() {
        $this->userFields['account_type'] = 'company';
        $response = $this->postJson('/api/register', $this->userFields);

        $response->assertJson([
            'status' => 'success'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'phone_number' => $this->userFields['phone_number']
        ]);
        $this->assertDatabaseHas('companies', [
            'email' => $this->userFields['email']
        ]);
    }

    public function testSuccessRegister() {
        $response = $this->postJson('/api/register', $this->userFields);

        $this->assertDatabaseHas('users', [
            'phone_number' => $this->userFields['phone_number']
        ]);
        $response->assertJson([
            'status' => 'success'
        ]);
        $response->assertStatus(200);
    }

    public function testLoginSuccess() {
        User::factory()->create();
        $response = $this->postJson('/api/login', $this->userFields);
        $response->assertJson([
            'status' => 'success'
        ]);
        $response->assertStatus(200);
    }

    public function testLoginFail() {
        User::factory()->create();
        $this->userFields['password'] = '12345678';
        $response = $this->postJson('/api/login', $this->userFields);
        $response->assertJson([
            'status' => 'error'
        ]);
        $response->assertStatus(401);
    }
}
