<?php

namespace App\Http\Controllers\Api\V1\FrontEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProviderSubscription;
use App\Models\ServiceProvider;
use App\Models\SubscriptionPlan;
use Illuminate\Support\Carbon;

class ProviderSubscriptionController extends Controller
{
    // Subscribe a provider to a plan
    public function subscribe(Request $request)
    {
        $data = $request->validate([
            'service_provider_id' => 'required|exists:service_providers,id',
            'subscription_plan_id' => 'required|exists:subscription_plans,id',
        ]);
        $provider = ServiceProvider::findOrFail($data['service_provider_id']);
        $plan = SubscriptionPlan::findOrFail($data['subscription_plan_id']);

        // Deactivate previous active subscriptions
        ProviderSubscription::where('service_provider_id', $provider->id)
            ->where('is_active', true)
            ->update(['is_active' => false]);

        $now = now();
        $end = $now->copy()->addDays($plan->duration_days);
        $subscription = ProviderSubscription::create([
            'service_provider_id' => $provider->id,
            'subscription_plan_id' => $plan->id,
            'start_date' => $now,
            'end_date' => $end,
            'is_active' => true,
        ]);
        return response()->json($subscription, 201);
    }

    // Unsubscribe (deactivate) a provider's current subscription
    public function unsubscribe(Request $request)
    {
        $data = $request->validate([
            'service_provider_id' => 'required|exists:service_providers,id',
        ]);
        $provider = ServiceProvider::findOrFail($data['service_provider_id']);
        $active = $provider->activeSubscription()->first();
        if ($active) {
            $active->is_active = false;
            $active->save();
            return response()->json(['message' => 'Unsubscribed.']);
        }
        return response()->json(['message' => 'No active subscription.'], 404);
    }

    // List all subscriptions for a provider
    public function mySubscriptions($provider_id)
    {
        $provider = ServiceProvider::findOrFail($provider_id);
        $subs = $provider->providerSubscriptions()->with('subscriptionPlan')->get();
        return response()->json($subs);
    }

    // Check if provider is promoted
    public function checkPromotion($provider_id)
    {
        $provider = ServiceProvider::findOrFail($provider_id);
        return response()->json(['promoted' => $provider->isPromoted()]);
    }
} 