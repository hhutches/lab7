import { useMemo, useState } from "react";

const initialValues = {
  name: "",
  email: "",
  title: "",
  bio: "",
  imageFile: null,
};

export default function AddProfileForm({ onAddCard }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const imagePreviewUrl = useMemo(() => {
    if (!values.imageFile) return "";
    return URL.createObjectURL(values.imageFile);
  }, [values.imageFile]);

  function validate(v) {
    const errors = {};

    // Name
    if (!v.name.trim()) errors.name = "Name is required.";
    else if (v.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

    // Email
    if (!v.email.trim()) errors.email = "Email is required.";
    else {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim());
      if (!emailOk) errors.email = "Please enter a valid email (example@domain.com).";
    }

    // Title
    if (!v.title.trim()) errors.title = "Title is required.";
    else if (v.title.trim().length < 2) errors.title = "Title must be at least 2 characters.";

    // Bio
    if (!v.bio.trim()) errors.bio = "Bio is required.";
    else if (v.bio.trim().length < 10) errors.bio = "Bio must be at least 10 characters.";

    // Image
    if (!v.imageFile) {
      errors.imageFile = "Please choose an image file.";
    } else {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowed.includes(v.imageFile.type)) {
        errors.imageFile = "Image must be JPG, PNG, WEBP, or GIF.";
      } else {
        const maxBytes = 2 * 1024 * 1024; // 2MB
        if (v.imageFile.size > maxBytes) errors.imageFile = "Image must be under 2MB.";
      }
    }

    return errors;
  }

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function setField(name, value) {
    setSubmitted(false);
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function markTouched(name) {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // mark everything touched so errors show
    setTouched({
      name: true,
      email: true,
      title: true,
      bio: true,
      imageFile: true,
    });

    if (!isValid) {
      setSubmitted(false);
      return;
    }

    // Create an image URL for the card
    const imageUrl = URL.createObjectURL(values.imageFile);

    // ✅ Make a "Card" object that matches your existing Card component props
    const card = {
      id: crypto.randomUUID(),
      // Choose what you want as the card title:
      // title: values.title.trim(), // (option A: filter by job title)
      title: values.name.trim(), // (option B: filter by person name)
      description: `${values.title.trim()} • ${values.email.trim()}\n\n${values.bio.trim()}`,
      image: imageUrl,
    };

    onAddCard?.(card);

    setSubmitted(true);
    setValues(initialValues);
    setTouched({});
  }

  return (
    <section className="addProfile">
     

      {submitted && (
        <div className="formMessage formMessage--success" role="status">
          ✅ Profile submitted successfully!
        </div>
      )}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <label className="formField">
          Name
          <input
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            onBlur={() => markTouched("name")}
            aria-invalid={touched.name && !!errors.name}
          />
          {touched.name && errors.name && <p className="error">{errors.name}</p>}
        </label>

        <label className="formField">
          Email
          <input
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => markTouched("email")}
            aria-invalid={touched.email && !!errors.email}
          />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}
        </label>

        <label className="formField">
          Title
          <input
            value={values.title}
            onChange={(e) => setField("title", e.target.value)}
            onBlur={() => markTouched("title")}
            aria-invalid={touched.title && !!errors.title}
          />
          {touched.title && errors.title && <p className="error">{errors.title}</p>}
        </label>

        <label className="formField">
          Bio
          <textarea
            value={values.bio}
            onChange={(e) => setField("bio", e.target.value)}
            onBlur={() => markTouched("bio")}
            aria-invalid={touched.bio && !!errors.bio}
            rows={4}
          />
          {touched.bio && errors.bio && <p className="error">{errors.bio}</p>}
        </label>

        <label className="formField">
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setField("imageFile", e.target.files?.[0] ?? null)}
            onBlur={() => markTouched("imageFile")}
            aria-invalid={touched.imageFile && !!errors.imageFile}
          />
          {touched.imageFile && errors.imageFile && (
            <p className="error">{errors.imageFile}</p>
          )}

          {values.imageFile && !errors.imageFile && (
            <div className="preview">
              <p className="previewLabel">Preview:</p>
              <img className="previewImg" src={imagePreviewUrl} alt="Selected preview" />
            </div>
          )}
        </label>

        <button type="submit">Submit Profile</button>
      </form>
    </section>
  );
}