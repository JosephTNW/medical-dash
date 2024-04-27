import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Field from "../Field/Field";
// import React, { useState } from "react";
// import Check from "./check-mark.png";
// import Cross from "./cross.png";
// import Select, { components } from "react-select";

// 1. width tambahin / geser ke satu sisi and tambahin one element di sisi kanan or kiri
// 2. border color hilangin,
// 3. border radius tambahin for the forms
// 4. Nama field (teks di atas form) dan form di sejajarin
// 5. ganti form background color from white to smth?
// 6. Better if you can add more images on the options biar interaktif
// 7. Adjust warna field name

/**
 * @typedef {z.infer<typeof Schema>} Schema
 */

// const icon = [
//   {
//     value: "Yes",
//     label: "Yes",
//     thumbnail: Check,
//   },
//   {
//     value: "No",
//     label: "No",
//     thumbnail: Cross,
//   },
// ];

// const Option = (props) => (
//   <components.Option {...props} className="icon-option">
//     <img src={props.data.icon} alt="icon" className="icon-logo" />
//     {props.data.label}
//   </components.Option>
// );

// Define Zod schema for form validation
const schema = z.object({
  General_Health: z.string(),
  Checkup: z.string(),
  Exercise: z.string(),
  Heart_Disease: z.string().optional(),
  Skin_Cancer: z.string(),
  Other_Cancer: z.string(),
  Depression: z.string(),
  Diabetes: z.string(),
  Arthritis: z.string(),
  Sex: z.string(),
  Age_Category: z.string(),
  Height: z.number().int(),
  Weight: z.number().positive(),
  BMI: z.number().positive(),
  Smoking_History: z.string(),
  Alcohol_Consumption: z.string(),
  Fruit_Consumption: z.string(),
  Green_Vegetables_Consumption: z.string(),
  FriedPotato_Consumption: z.string(),
});

const health_options = [
  { value: "Excellent", label: "Excellent" },
  { value: "Fair", label: "Fair" },
  { value: "Good", label: "Good" },
  { value: "Poor", label: "Poor" },
  { value: "Very Good", label: "Very Good" },
];

const checkup_options = [
  { value: "5 or more years ago", label: "5 or more years ago" },
  { value: "Never", label: "Never" },
  { value: "Within the past 2 years", label: "Within the past 2 years" },
  { value: "Poor", label: "Poor" },
  { value: "Very Good", label: "Very Good" },
];

const yes_no = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const exercise_options = yes_no;

const heart_options = yes_no;

const skin_cancer_options = yes_no;

const other_cancer_options = yes_no;

const depression_options = yes_no;

const arthritis_options = yes_no;

const smoking_options = yes_no;

const diabetes_options = [
  {
    value: "No",
    label: "No",
  },
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No, pre-diabetes or borderline diabetes",
    label: "No, pre-diabetes or borderline diabetes",
  },
  {
    value: "Yes, but female told only during pregnancy",
    label: "Yes, but female told only during pregnancy",
  },
];

const sex_options = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const age_options = [
  {
    value: "70-74",
    label: "70-74",
  },
  {
    value: "60-64",
    label: "60-64",
  },
  {
    value: "75-79",
    label: "75-79",
  },
  {
    value: "80+",
    label: "80+",
  },
  {
    value: "65-69",
    label: "65-69",
  },
  {
    value: "50-54",
    label: "50-54",
  },
  {
    value: "45-49",
    label: "45-49",
  },
  {
    value: "18-24",
    label: "18-24",
  },
  {
    value: "30-34",
    label: "30-34",
  },
  {
    value: "55-59",
    label: "55-59",
  },
  {
    value: "35-39",
    label: "35-39",
  },
  {
    value: "40-44",
    label: "40-44",
  },
  {
    value: "25-29",
    label: "25-29",
  },
];

/**
 * @param {Schema} schema
 */

const HealthForm = ({ values, onBackClick, action }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (values !== undefined) {
        handleAction({ ...data, id: values.id });
      } else {
        const formData = { ...data };
        if (!onBackClick) {
          delete formData.Heart_Disease;
        }
        handleAction(data);
      }
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  const handleBack = () => {
    onBackClick();
  };

  const handleAction = (data) => {
    action(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {onBackClick !== undefined ? (
        <button className="btn-back" onClick={() => handleBack()}>
          <img src="/arrow_back.svg"></img>
        </button>
      ) : null}
        <div className="form">
          {/* General Health */}
          <Field
            label={"General Health:"}
            id="General_Health"
            options={health_options}
            defaultValue={values !== undefined ? values.General_Health : ""}
            zod={register("General_Health")}
          />

          {/* Checkup */}
          <Field
            id="Checkup"
            label={"Last Health Checkup:"}
            options={checkup_options}
            defaultValue={values !== undefined ? values.Checkup : ""}
            zod={register("Checkup")}
          />

          {/* Exercise */}
          <Field
            label={"Physical Activity (Last Month):"}
            id="Exercise"
            options={exercise_options}
            zod={register("Exercise")}
            defaultValue={values !== undefined ? values.Exercise : ""}
          />

          {onBackClick && (
            <Field
              label={"Heart Disease:"}
              id="Heart_Disease"
              zod={register("Heart_Disease")}
              defaultValue={values !== undefined ? values.Heart_Disease : ""}
              options={heart_options}
            />
          )}

          {/* Skin Cancer */}
          <Field
            label={"History of Skin Cancer:"}
            id="Skin_Cancer"
            zod={register("Skin_Cancer")}
            defaultValue={values !== undefined ? values.Skin_Cancer : ""}
            options={skin_cancer_options}
          />

          {/* Other Cancers */}
          <Field
            label={"History of Other Cancers:"}
            id="Other_Cancer"
            zod={register("Other_Cancer")}
            defaultValue={values !== undefined ? values.Other_Cancer : ""}
            options={other_cancer_options}
          />

          {/* Depression */}
          <Field
            label={"Experience of Depression:"}
            id="Depression"
            zod={register("Depression")}
            defaultValue={values !== undefined ? values.Depression : ""}
            options={depression_options}
          />

          {/* Diabetes */}
          <Field
            label={"History of Diabetes:"}
            id="Diabetes"
            defaultValue={values !== undefined ? values.Diabetes : ""}
            zod={register("Diabetes")}
            options={diabetes_options}
          />

          {/* Arthritis */}
          <Field
            label={"History of Arthritis:"}
            id="Arthritis"
            defaultValue={values !== undefined ? values.Arthritis : ""}
            zod={register("Arthritis")}
            options={arthritis_options}
          />

          {/* Sex */}
          <Field
            label={"Gender:"}
            id="Sex"
            defaultValue={values !== undefined ? values.Sex : ""}
            zod={register("Sex")}
            options={sex_options}
          />

          {/* Age Category */}
          <Field
            label="Age Category:"
            id="Age_Category"
            options={age_options}
            defaultValue={values !== undefined ? values.Age_Category : ""}
            zod={register("Age_Category")}
          />

          {/* Height (cm) */}
          <Field
            label={"Height (cm):"}
            type="number"
            id="Height"
            defaultValue={values !== undefined ? values.Height : 0}
            zod={register("Height", { valueAsNumber: true })}
          />

          {/* Weight (kg) */}
          <Field
            label={"Weight (kg):"}
            type="number"
            id="Weight"
            defaultValue={values !== undefined ? values.Weight : 0}
            zod={register("Weight", { valueAsNumber: true })}
          />

          {/* BMI */}
          <Field
            label={"BMI:"}
            className="form_input"
            type="number"
            id="BMI"
            defaultValue={values !== undefined ? values.BMI : 0}
            zod={register("BMI", { valueAsNumber: true })}
          />

          {/* Smoking History */}
          <Field
            id="Smoking_History"
            label={"Smoking History:"}
            zod={register("Smoking_History")}
            options={smoking_options}
            defaultValue={values !== undefined ? values.Smoking_History : 0}
          />

          {/* Alcohol Consumption */}
          <Field
            label={"Alcohol Consumption Rate (0-30):"}
            type="number"
            id="Alcohol_Consumption"
            max={30}
            defaultValue={
              values !== undefined ? values.Alcohol_Consumption : 0
            }
            zod={register("Alcohol_Consumption")}
          />

          {/* Fruit Consumption */}
          <Field
            label={"Fruit Consumption Figures (0-120):"}
            type="number"
            max={120}
            id="Fruit_Consumption"
            defaultValue={values !== undefined ? values.Fruit_Consumption : 0}
            zod={register("Fruit_Consumption")}
          />

          {/* Green Vegetables Consumption */}
          <Field
            label={"Green Vegetables Consumption (0-128):"}
            className="form_input"
            type="number"
            max={128}
            id="Green_Vegetables_Consumption"
            defaultValue={
              values !== undefined ? values.Green_Vegetables_Consumption : 0
            }
            zod={register("Green_Vegetables_Consumption")}
          />

          {/* Fried Potato Consumption */}
          <Field
            label={"Fried Potato Consumption (0-128):"}
            className="form_input"
            type="number"
            max={128}
            id="FriedPotato_Consumption"
            defaultValue={
              values !== undefined ? values.FriedPotato_Consumption : 0
            }
            zod={register("FriedPotato_Consumption")}
          />

          {/* Submit Button */}
          <button className="btn-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors.root && <span className="error">{errors.root.message}</span>}
        </div>
    </form>
  );
};

export default HealthForm;
