<?php

namespace App\Models\Relations;

use Cache;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Enums\{Setting as Constant, Cache as ConstantCache};

trait EventSetting
{
    public function isOfferPackage(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->hasSetting(Constant::OFFER_PACKAGE->value)
        );
    }

    public function isFree(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->hasSetting(Constant::OFFER_FREE->value)
        );
    }

    public function isAllowedUploadProofPayment(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->hasSetting(Constant::ALLOW_UPLOAD_PAYMENT->value)
        );
    }

    public function isAllowedPaymentIntegration(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->hasSetting(Constant::ALLOW_PAYMENT_INTEGRATION->value)
        );
    }

    protected function hasSetting($name)
    {
        $key = ConstantCache::eventSettingKey($this->id);

        $cache = function ($name, $data = []) use ($key) {
            return Cache::remember($key, Carbon::now()->addMonth(), function () use ($name, $data) {
                return [
                    ...$data,
                    str($name)->slug()->value => $this->settings->filter(
                        fn(\App\Models\EventSetting $s) => strtolower($s->setting->name) == strtolower($name) && $s->value == 1
                    )->count() > 0
                ];
            });
        };

        $data = $cache($name);

        $checker = function ($name) use ($data) {
            $slug = str($name)->slug()->value;
            if (array_key_exists($slug, $data)) {
                return $data[$slug];
            }
            return null;
        };

        if (!is_null($value = $checker($name)))
            return $value;

        Cache::forget($key);

        return $this->hasSetting($name);
    }
}
