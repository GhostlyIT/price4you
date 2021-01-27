<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameColumnsUserRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_requests', function (Blueprint $table) {
            $table->renameColumn('payment_method_id', 'payment_method');
            $table->renameColumn('delivery_method_id', 'delivery_method');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_requests', function (Blueprint $table) {
            $table->renameColumn('payment_method', 'payment_method_id');
            $table->renameColumn('delivery_method', 'delivery_method_id');
        });
    }
}
