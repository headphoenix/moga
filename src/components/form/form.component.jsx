import { useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { collection, addDoc, getDoc, admin } from "@firebase/firestore";
import { PaystackButton } from 'react-paystack'
import { nanoid } from 'nanoid';
import emailjs from '@emailjs/browser';
import { useRef, useId } from 'react';
import { customAlphabet } from 'nanoid'
import messagebird from "messagebird";



import "./form.styles.css"

const defaultFormFields = {
    name: "",
    maidenName: "",
    yearOfCompletion: "",
    house: "",
    title: "",
    maritalStatus: "",
    dateOfBirth: "",
    telNumber: "",
    whatsappNumber: "",
    email: "",
    occupation: "",
    jobPosition: "",
    areaOfExperience: "",
    business: "",
    busName: "",
    busLogo: "",
    busProduct: "",
    busContact: "",
    busWebsite: "",
    mogaId: '',
    company: "",
};

const Form = () => {

    const publicKey = "pk_live_881b975d6fbcfb5f044347896b02af17de9109c5"
    const amount = 150
    const currency = "GHS"

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name,
        maidenName,
        yearOfCompletion,
        house,
        title,
        maritalStatus,
        dateOfBirth,
        telNumber,
        whatsappNumber,
        email,
        occupation,
        jobPosition,
        areaOfExperience,
        business,
        busName,
        busLogo,
        busProduct,
        busContact,
        busWebsite,
        mogaId,
        company, } = formFields;

    const nanoid = customAlphabet('1234567890')

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value, mogaId: `MOGA${yearOfCompletion}-${nanoid(7)}` });
    };

    // const mogaId = `MOGA${yearOfCompletion}-${nanoid()}`
    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const messageBird = (e) => {
      e.preventDefault();
    
      var messagebird = require('messagebird')('PDOnAh6IREtoHJCyEjqPK1e6u');

      var params = {
          'to': '+233205633254',
          'from': '79b77f36-511c-4949-818b-83bbbc36b0a4',
          'type': 'text',
          'content': {
              'text': `Hello ${title} ${name},
Thank you for registering as a member of the Mfantsiman Old Girls Association(MOGA). Your Personal MOGA ID is: ${mogaId}`,
              'disableUrlPreview': true
          }
      };

      messagebird.conversations.send(params, function (err, response) {
          if (err) {
              return console.log(err);
          }
          console.log(response);
      });

    }

    const form = useRef();

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //      const memberDetails = {
    //                  name: name,
    //         maidenName: maidenName,
    //         yearOfCompletion: yearOfCompletion,
    //         house: house,
    //         title: title,
    //         maritalStatus: maritalStatus,
    //         dateOfBirth: dateOfBirth,
    //         telNumber: telNumber,
    //         whatsappNumber: whatsappNumber,
    //         email: email,
    //         occupation: occupation,
    //         jobPosition: jobPosition,
    //         areaOfExperience: areaOfExperience,
    //         business: business,
    //         busName: busName,
    //         busLogo: busLogo,
    //         busProduct: busProduct,
    //         busContact: busContact,
    //         busWebsite: busWebsite,
    //      }
    //     try {
    //         const docRef = await addDoc(collection(db, "users"), memberDetails);
    //         console.log("Document written with ID: ", docRef.id);
    //       } catch (e) {
    //         console.error("Error adding document: ", e);
    //       }
    //       resetFormFields();
    //   }


    const componentProps = {
        email,
        amount,
        currency,
        metadata: {
            name,
            telNumber,
        },
        publicKey,
        text: "Register",
        onSuccess: () => {
            alert("Thanks for doing business with us! Come back soon!!");
            const memberDetails = {
                name: name,
                maidenName: maidenName,
                yearOfCompletion: yearOfCompletion,
                house: house,
                title: title,
                maritalStatus: maritalStatus,
                dateOfBirth: dateOfBirth,
                telNumber: telNumber,
                whatsappNumber: whatsappNumber,
                email: email,
                occupation: occupation,
                jobPosition: jobPosition,
                areaOfExperience: areaOfExperience,
                business: business,
                busName: busName,
                busLogo: busLogo,
                busProduct: busProduct,
                busContact: busContact,
                busWebsite: busWebsite,
                company: company,
                mogaId: mogaId,
            }
            try {
                const docRef = addDoc(collection(db, "users"), memberDetails);
                console.log("Document written with ID: ", docRef.id);

                emailjs.sendForm('service_r5b6zar', 'template_gtcis15', form.current, 'i81xuBxQny_dCNZ8e')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });

                var messagebird = require('messagebird')('PDOnAh6IREtoHJCyEjqPK1e6u');

                var params = {
                    'to': '+233205633254',
                    'from': '79b77f36-511c-4949-818b-83bbbc36b0a4',
                    'type': 'text',
                    'content': {
                        'text': `Hello ${title} ${name},
    Thank you for registering as a member of the Mfantsiman Old Girls Association(MOGA). Your Personal MOGA ID is: ${mogaId}`,
                        'disableUrlPreview': true
                    }
                };

                messagebird.conversations.send(params, function (err, response) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(response);
                });
                resetFormFields();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        onClose: () => alert("You've not registered yet"),
    }

    return (
        <div>
            <form id="form" ref={form} onSubmit={messageBird}>
                <div id="center">
                    <label>
                        Full Name:
                    </label>
                    <input type="text" required name="name" value={name} onChange={handleChange} />
                    <br />
                    <label>
                        Maiden Name:
                    </label>
                    <input type="text" name="maidenName" value={maidenName} onChange={handleChange} />
                    <label>
                        Year of Completion:
                    </label>
                    <input type="text" required name="yearOfCompletion" value={yearOfCompletion} onChange={handleChange} />
                    <input type="text" hidden name="mogaId" value={mogaId} />
                    <label>
                        House:
                        <select onChange={handleChange} name="house" value={house} required>
                            <option value=""></option>
                            <option value="Butler">Butler</option>
                            <option value="Chinery">Chinery</option>
                            <option value="Engmann">Engmann</option>
                            <option value="Scotton">Scotton</option>
                            <option value="Yeboah">Yeboah</option>
                            <option value="Croffie">Croffie</option>
                        </select>
                    </label>
                    <label>
                        Title:
                        <select onChange={handleChange} name="title" value={title} required >
                            <option value=""></option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Dr">Dr</option>
                            <option value="Professor">Professor</option>
                            <option value="Honourable">Honourable</option>
                        </select>
                    </label>
                    <label>
                        Marital Status:
                        <select onChange={handleChange} name="maritalStatus" value={maritalStatus} required>
                            <option value=""></option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                        </select>
                    </label>
                    <label >Date of Birth:
                        <input type="date" required name="dateOfBirth" value={dateOfBirth} onChange={handleChange} />
                    </label>
                    <label >Telephone Number:
                        <input type="tel" required name="telNumber" value={telNumber} onChange={handleChange} />
                    </label>
                    <label >WhatsApp Number:
                        <input type="tel" required name="whatsappNumber" value={whatsappNumber} onChange={handleChange} />
                    </label>
                    <label >Email Address:
                        <input type="email" required name="email" value={email} onChange={handleChange} />
                    </label>
                    <label >Your Occupation:
                        <input type="text" required name="occupation" value={occupation} onChange={handleChange} />
                    </label>
                    <label >Your Job Position:
                        <input type="text" required name="jobPosition" value={jobPosition} onChange={handleChange} />
                    </label>
                    <label >Company:
                        <input type="text" required name="company" value={company} onChange={handleChange} />
                    </label>
                    <label >What is your area of Experience:
                        <input type="text" required name="areaOfExperience" value={areaOfExperience} onChange={handleChange} />
                    </label>
                    <div className="radio" >
                        <p>Do you own a business:</p>
                        <input
                            type="radio"
                            name="business"
                            value="Yes"
                            checked={business === "Yes"}
                            onChange={handleChange}
                            required
                        />
                        Yes
                        <input
                            type="radio"
                            name="business"
                            value="No"
                            checked={business === "No"}
                            onChange={handleChange}
                            required
                        />
                        No
                    </div>
                </div>
                {business === "Yes" && <div>
                    <h2>Kindly provide Details of your business</h2>
                    <label>
                        Name:
                        <input type="text" name="busName" value={busName} onChange={handleChange} />
                    </label>
                    <label>
                        Logo and TagLine:
                        <input type="text" name="busLogo" value={busLogo} onChange={handleChange} />
                    </label>
                    <label>
                        Products and Services:
                        <input type="text" name="busProduct" value={busProduct} onChange={handleChange} />
                    </label>
                    <label>
                        Contact Details:
                        <input type="text" name="busContact" value={busContact} onChange={handleChange} />
                    </label>
                    <label>
                        Website:
                        <input type="text" name="busWebsite" value={busWebsite} onChange={handleChange} />
                    </label>

                </div>}
                <p>
                    MOGA is committed to protecting the privacy of confidential information shared as much as possible. The information provided is used solely to keep record of our members and to help the MOGA operate efficiently to serve you better. We will only share information you provide with third parties in a manner permitted or required by law / Companies Act 2019(Act 992). Your personal data is kept secure. Only authorized members will have access to this information. If you have any questions or comments about this Privacy Statement, please reach us through MOGA NEC.
                </p>


                <p>The Subscription fee for registring as a Moga Member is 150 cedis</p>
                <button type="submit">Submit</button>
            </form>
            <PaystackButton {...componentProps} />
        </div>
    );
}

export default Form;