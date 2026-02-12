import { useState } from "react"

export default function RegistrationForm () {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        age: "",
        gender: "",
        role: "Student",
        acceptTerms: false,
    })
    const [submittedData, setSubmittedData] = useState(null)
    const [errors, setErrors] = useState("")

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (formData.fullname.trim() === "" && formData.email.trim() === "" && formData.age === "" && formData.gender === "" && !formData.acceptTerms) {
            setErrors("Please complete all required files")
            return
        }
        if (formData.fullname.trim() === "" || formData.email.trim() === "" || formData.age <= 0 || formData.gender === "" || !formData.acceptTerms) {
            setErrors({
                fullname: formData.fullname.trim() === "" ? "Fullname cannot be empty" : "",
                email: formData.email.trim() === "" ? "Email cannot be empty" : "",
                age: formData.age <= 0 ? "Age must be greater than 0" : "",
                gender: formData.gender === "" ? "Gender must be selected" : "",
                acceptTerms: !formData.acceptTerms ? "Accept Terms must be checked" : ""
            })
            return
        } else {
            setErrors("")
            setSubmittedData(formData)
            console.log("Submitted")
        }
        console.log(formData)
    }

    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="thumbnail"><h1>Registration Form</h1></div>
            <div><p>Full Name:</p><input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className={errors.fullname ? "error" : ""}/></div>
            <span className="error">{errors.fullname}</span>
            <div><p>Email:</p><input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? "error" : ""}/></div>
            <span className="error">{errors.email}</span>
            <div><p>Age:</p><input type="number" name="age" value={formData.age} onChange={handleChange} className={errors.age ? "error" : ""}/></div>
            <span className="error">{errors.age}</span>

            <div>
                <p>Gender:</p>
                <label><input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange}/>Male</label>
                <label><input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange}/>Female</label>
            </div>
            <span className="error">{errors.gender}</span>

            <div>
                <p>Role:</p>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>
            </div>

            <label><input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange}/>Accept Terms And Conditions</label>
            <span className="error">{errors.acceptTerms}</span>

            <button type="submit">Register</button>
            <span className="errorbutall">{typeof errors === "string" ? errors : ""}</span>
        </form>
        {submittedData && (
            <div className="submitted-data">
                <div>
                    <h2>Registration Summary</h2>
                </div>
                <p className="left">Fullname: <p className="right">{submittedData.fullname}</p></p>
                <p className="left">Email: <p className="right">{submittedData.email}</p></p>
                <p className="left">Age: <p className="right">{submittedData.age}</p></p>
                <p className="left">Gender: <p className="right">{submittedData.gender}</p></p>
                <p className="left">Role: <p className="right">{submittedData.role}</p></p>
                <p className="left">Accepted Terms: <p className="right">{submittedData.acceptTerms ? "Yes" : "No"}</p></p>
            </div>
        )}
        </>
    )
}