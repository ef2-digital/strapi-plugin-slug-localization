import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import {
  Stack,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput,
} from "@strapi/design-system";
import slugify from "slugify";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";

interface InputProps {
  value: string;
  name: string;
  attribute: any;
  intlLabel: any;
  labelAction: string;
  required: boolean;
  description: any;
  error: string;
  onChange: Function;
}

const Input = ({
  value,
  name,
  onChange,
  error,
  description,
  required,
  labelAction,
  intlLabel,
  attribute,
}: InputProps) => {
  const { formatMessage } = useIntl();

  const { modifiedData } = useCMEditViewDataManager();

  const [edited, setEditStatus] = useState(false);
  const [slug, setSlug] = useState(value);

  useEffect(() => {
    if (modifiedData.title && (!edited || !value)) {
      setSlug(createSlug(modifiedData.title));
      onChange({ target: { name, value: slug, type: attribute.type } });
    }
  }, [modifiedData]);

  const createSlug = (value: string) => {
    return slugify(value, { lower: true, strict: false, trim: false });
  };

  const handleChange = (value: string) => {
    setEditStatus(true);
    const slug = createSlug(value);

    setSlug(slug);

    onChange({ target: { name, value: slug, type: attribute.type } });
  };

  return (
    <Stack spacing={1}>
      <Field
        name={name}
        id={name}
        error={error}
        hint={description && formatMessage(description)}
        required={required}
      >
        <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
        <FieldInput
          id="slug-localization"
          value={slug}
          onChange={(e) => handleChange(e.target.value)}
        />
        <FieldHint />
        <FieldError />
      </Field>
    </Stack>
  );
};

export default Input;
