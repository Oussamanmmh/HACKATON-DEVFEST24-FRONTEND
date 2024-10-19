import SignUpForm from "./form";
import Paragraph from "./paragraph";

export default function SingUpPage(){
    return (
        <>
                <section className="flex gap-10 px-10 py-4 bg-blue-500  " style={{'background': 'linear-gradient(127.6deg, #5D2EEA -21.83%, #5D2EEA -11.34%, #F5F6FA 117.78%)'}}>
                        <Paragraph/>
                        <SignUpForm/>
                </section>
        </>
    )
}