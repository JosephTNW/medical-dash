import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  Heart_Disease: z.string(),
  Skin_Cancer: z.string(),
  Other_Cancer: z.string(),
  Depression: z.string(),
  Diabetes: z.string(),
  Arthritis: z.string(),
  Sex: z.string(),
  Age_Category: z.string(),
  Height_cm: z.number().int(),
  Weight_kg: z.number().positive(),
  BMI: z.number().positive(),
  Smoking_History: z.string(),
  Alcohol_Consumption: z.string(),
  Fruit_Consumption: z.string(),
  Green_Vegetables_Consumption: z.string(),
  FriedPotato_Consumption: z.string(),
});

/**
 * @param {Schema} schema
 */

const HealthForm = () => {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "Something went wrong",
      });
    }
  };

  // const [selectedOption, setSelectedOption] = useState(icon[0]);

  // handle onChange event of the dropdown
  // const handleChange = (e) => {
  //   setSelectedOption(e);
  // };

  // const SingleValue = ({ children, ...props }) => (
  //   <components.SingleValue {...props}>
  //     <img src={selectedOption.icon} alt="s-icon" className="selected-icon" />
  //     {children}
  //   </components.SingleValue>
  // );

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <div className="form">
          {/* General Health */}
          <div>
            <label className="form_label" htmlFor="General_Health">
              General Health:
            </label>
            <input
              className="form_input"
              type="text"
              id="General_Health"
              {...register("General_Health")}
            />
            {errors.General_Health && (
              <p className="error">{errors.General_Health.message}</p>
            )}
          </div>

          {/* Checkup */}
          <div>
            <label className="form_label" htmlFor="Checkup">
              Last Health Checkup:
            </label>
            <input
              className="form_input"
              type="text"
              id="Checkup"
              {...register("Checkup")}
            />
            {errors.Checkup && (
              <p className="error">{errors.Checkup.message}</p>
            )}
          </div>

          {/* Exercise */}
          <div>
            <label className="form_label" htmlFor="Exercise">
              Physical Activity (Last Month):
            </label>
            <select
              id="Exercise"
              {...register("Exercise")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // styles={{
              //   singleValue: (base) => ({
              //     ...base,
              //     display: "flex",
              //     alignItems: "center",
              //   }),
              // }}
              // components={{
              //   Option,
              //   SingleValue,
              // }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Exercise && (
              <p className="error">{errors.Exercise.message}</p>
            )}
          </div>

          {/* Heart Disease */}
          <div>
            <label className="form_label" htmlFor="Heart_Disease">
              History of Heart Disease:
            </label>
            <select
              id="Heart_Disease"
              {...register("Heart_Disease")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // getOptionLabel={(e) => (
              //   <div style={{ display: "flex", alignItems: "center" }}>
              //     {e.icon}
              //     <span style={{ marginLeft: 5 }}>{e.text}</span>
              //   </div>
              // )}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Heart_Disease && (
              <p className="error">{errors.Heart_Disease.message}</p>
            )}
          </div>

          {/* Skin Cancer */}
          <div>
            <label className="form_label" htmlFor="Skin_Cancer">
              History of Skin Cancer:
            </label>
            <select
              id="Skin_Cancer"
              {...register("Skin_Cancer")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // getOptionLabel={(e) => (
              //   <div style={{ display: "flex", alignItems: "center" }}>
              //     {e.icon}
              //     <span style={{ marginLeft: 5 }}>{e.text}</span>
              //   </div>
              // )}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Skin_Cancer && (
              <p className="error">{errors.Skin_Cancer.message}</p>
            )}
          </div>

          {/* Other Cancers */}
          <div>
            <label className="form_label" htmlFor="Other_Cancer">
              History of Other Cancers:
            </label>
            <select
              id="Other_Cancer"
              {...register("Other_Cancer")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // getOptionLabel={(e) => (
              //   <div style={{ display: "flex", alignItems: "center" }}>
              //     {e.icon}
              //     <span style={{ marginLeft: 5 }}>{e.text}</span>
              //   </div>
              // )}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Other_Cancer && (
              <p className="error">{errors.Other_Cancer.message}</p>
            )}
          </div>

          {/* Depression */}
          <div>
            <label className="form_label" htmlFor="Depression">
              Experience of Depression:
            </label>
            <select
              id="Depression"
              {...register("Depression")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // getOptionLabel={(e) => (
              //   <div style={{ display: "flex", alignItems: "center" }}>
              //     {e.icon}
              //     <span style={{ marginLeft: 5 }}>{e.text}</span>
              //   </div>
              // )}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Depression && (
              <p className="error">{errors.Depression.message}</p>
            )}
          </div>

          {/* Diabetes */}
          <div>
            <label className="form_label" htmlFor="Diabetes">
              History of Diabetes:
            </label>
            <input
              className="form_input"
              type="text"
              id="Diabetes"
              {...register("Diabetes")}
            />
            {errors.Diabetes && (
              <p className="error">{errors.Diabetes.message}</p>
            )}
          </div>

          {/* Arthritis */}
          <div>
            <label className="form_label" htmlFor="Arthritis">
              History of Arthritis:
            </label>
            <input
              className="form_input"
              type="text"
              id="Arthritis"
              {...register("Arthritis")}
            />
            {errors.Arthritis && (
              <p className="error">{errors.Arthritis.message}</p>
            )}
          </div>

          {/* Sex */}
          <div>
            <label className="form_label" htmlFor="Sex">
              Gender:
            </label>
            <select id="Sex" {...register("Sex")}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.Sex && <p className="error">{errors.Sex.message}</p>}
          </div>

          {/* Age Category */}
          <div>
            <label className="form_label" htmlFor="Age_Category">
              Age Category:
            </label>
            <input
              className="form_input"
              type="text"
              id="Age_Category"
              {...register("Age_Category")}
            />
            {errors.Age_Category && (
              <p className="error">{errors.Age_Category.message}</p>
            )}
          </div>

          {/* Height (cm) */}
          <div>
            <label className="form_label" htmlFor="Height_cm">
              Height (cm):
            </label>
            <input
              className="form_input"
              type="number"
              id="Height_cm"
              {...register("Height_cm", { valueAsNumber: true })}
            />
            {errors.Height_cm && (
              <p className="error">{errors.Height_cm.message}</p>
            )}
          </div>

          {/* Weight (kg) */}
          <div>
            <label className="form_label" htmlFor="Weight_kg">
              Weight (kg):
            </label>
            <input
              className="form_input"
              type="number"
              id="Weight_kg"
              {...register("Weight_kg", { valueAsNumber: true })}
            />
            {errors.Weight_kg && (
              <p className="error">{errors.Weight_kg.message}</p>
            )}
          </div>

          {/* BMI */}
          <div>
            <label className="form_label" htmlFor="BMI">
              Body Mass Index (BMI):
            </label>
            <input
              className="form_input"
              type="number"
              id="BMI"
              {...register("BMI", { valueAsNumber: true })}
            />
            {errors.BMI && <p className="error">{errors.BMI.message}</p>}
          </div>

          {/* Smoking History */}
          <div>
            <label className="form_label" htmlFor="Smoking_History">
              Smoking History:
            </label>
            <select //it should be Select with capital but for later this just my note
              id="Smoking_History"
              {...register("Smoking_History")}
              // value={selectedOption}
              // options={icon}
              // onChange={handleChange}
              // getOptionLabel={(e) => (
              //   <div style={{ display: "flex", alignItems: "center" }}>
              //     {e.icon}
              //     <span style={{ marginLeft: 5 }}>{e.text}</span>
              //   </div>
              // )}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.Smoking_History && (
              <p className="error">{errors.Smoking_History.message}</p>
            )}
          </div>

          {/* Alcohol Consumption */}
          <div>
            <label className="form_label" htmlFor="Alcohol_Consumption">
              Alcohol Consumption Rate:
            </label>
            <input
              className="form_input"
              type="text"
              id="Alcohol_Consumption"
              {...register("Alcohol_Consumption")}
            />
            {errors.Alcohol_Consumption && (
              <p className="error">{errors.Alcohol_Consumption.message}</p>
            )}
          </div>

          {/* Fruit Consumption */}
          <div>
            <label className="form_label" htmlFor="Fruit_Consumption">
              Fruit Consumption Figures:
            </label>
            <input
              className="form_input"
              type="text"
              id="Fruit_Consumption"
              {...register("Fruit_Consumption")}
            />
            {errors.Fruit_Consumption && (
              <p className="error">{errors.Fruit_Consumption.message}</p>
            )}
          </div>

          {/* Green Vegetables Consumption */}
          <div>
            <label
              className="form_label"
              htmlFor="Green_Vegetables_Consumption"
            >
              Green Vegetables Consumption:
            </label>
            <input
              className="form_input"
              type="text"
              id="Green_Vegetables_Consumption"
              {...register("Green_Vegetables_Consumption")}
            />
            {errors.Green_Vegetables_Consumption && (
              <p className="error">
                {errors.Green_Vegetables_Consumption.message}
              </p>
            )}
          </div>

          {/* Fried Potato Consumption */}
          <div>
            <label className="form_label" htmlFor="FriedPotato_Consumption">
              Fried Potato Consumption:
            </label>
            <input
              className="form_input"
              type="text"
              id="FriedPotato_Consumption"
              {...register("FriedPotato_Consumption")}
            />
            {errors.FriedPotato_Consumption && (
              <p className="error">{errors.FriedPotato_Consumption.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {errors.root && <span className="error">{errors.root.message}</span>}
        </div>
      </div>
    </form>
  );
};

export default HealthForm;
