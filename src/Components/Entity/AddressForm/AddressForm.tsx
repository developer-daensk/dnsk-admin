"use client";

import { iLocale } from "../Locale/types";
import { Input } from "../../Shadcn/input";
import { Label } from "../../Shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Shadcn/select";
import { useParams } from "next/navigation";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import AddressAutocomplete from "./Components/AddressAutocomplete";
import { ADDRESS_FIELDS_NAMES, COUNTRIES } from "./constants";
import { getDictionary } from "./i18n";
import { iAddress } from "./types";

interface iProps<T extends { address: iAddress }> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  fieldsInRow?: number;
  label?: boolean;
}

export default function AddressForm<T extends { address: iAddress }>(
  props: iProps<T>
) {
  const {
    register,
    control,
    errors,
    fieldsInRow = 3,
    setValue,
    label = false,
  } = props;
  const { locale } = useParams<{ locale: iLocale }>();
  const dictionary = getDictionary(locale);

  const handleAutocompleteChange = (selectedAddress: iAddress | undefined) => {
    if (!selectedAddress) return;
    ADDRESS_FIELDS_NAMES.forEach((fieldName) => {
      const value = selectedAddress[fieldName];
      if (value) {
        const path = `address.${fieldName}` as Path<T>;
        setValue(path, value as PathValue<T, typeof path>, {
          shouldDirty: true,
        });
      }
    });
  };

  return (
    <>
      <div className="space-y-2">
        {label && <Label htmlFor="customer-number">{dictionary.label}</Label>}
        <AddressAutocomplete
          dictionary={dictionary}
          onChange={handleAutocompleteChange}
        />
      </div>
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-${fieldsInRow}`}>
        <div className="space-y-2">
          <Label htmlFor="address-street">
            {dictionary.form.street.label} *
          </Label>
          <Input
            id="address-street"
            placeholder={dictionary.form.street.placeholder}
            {...register("address.street" as Path<T>, {
              required: dictionary.form.street.required,
            })}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.street?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).street?.message}
              </p>
            )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-house-number">
            {dictionary.form.houseNumber.label} *
          </Label>
          <Input
            id="address-house-number"
            placeholder={dictionary.form.houseNumber.placeholder}
            {...register("address.houseNumber" as Path<T>, {
              required: dictionary.form.houseNumber.required,
            })}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.houseNumber?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).houseNumber?.message}
              </p>
            )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-postal-code">
            {dictionary.form.postalCode.label} *
          </Label>
          <Input
            id="address-postal-code"
            placeholder={dictionary.form.postalCode.placeholder}
            {...register("address.postalCode" as Path<T>, {
              required: dictionary.form.postalCode.required,
            })}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.postalCode?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).postalCode?.message}
              </p>
            )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-city">{dictionary.form.city.label} *</Label>
          <Input
            id="address-city"
            placeholder={dictionary.form.city.placeholder}
            {...register("address.city" as Path<T>, {
              required: dictionary.form.city.required,
            })}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.city?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).city?.message}
              </p>
            )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-state">{dictionary.form.state.label} *</Label>
          <Input
            id="address-state"
            placeholder={dictionary.form.state.placeholder}
            {...register("address.state" as Path<T>, {
              required: dictionary.form.state.required,
            })}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.state?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).state?.message}
              </p>
            )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-country">
            {dictionary.form.country.label} *
          </Label>
          <Controller
            name={"address.countryName" as Path<T>}
            control={control}
            rules={{ required: dictionary.form.country.required }}
            render={({ field }) => (
              <Select
                value={(field.value as string | null)?.toString() || ""}
                onValueChange={(countryName) => {
                  field.onChange(countryName);
                  const country = COUNTRIES.find((c) => c.name === countryName);
                  if (country) {
                    const iso2Path = "address.countryIso2" as Path<T>;
                    const iso3Path = "address.countryIso3" as Path<T>;
                    setValue(
                      iso2Path,
                      country.countryIso2 as PathValue<T, typeof iso2Path>
                    );
                    setValue(
                      iso3Path,
                      country.countryIso3 as PathValue<T, typeof iso3Path>
                    );
                  }
                }}
              >
                <SelectTrigger id="address-country" className="w-full">
                  <SelectValue
                    placeholder={dictionary.form.country.placeholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors?.address &&
            (errors.address as FieldErrors<iAddress>)?.countryName?.message && (
              <p className="text-destructive text-sm">
                {(errors.address as FieldErrors<iAddress>).countryName?.message}
              </p>
            )}
        </div>
      </div>
    </>
  );
}
