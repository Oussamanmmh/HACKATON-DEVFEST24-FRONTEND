import LoginForm from "./form";

export default function LoginPage() {
  return (
    <>
      <section
        className="flex justify-center h-full "
        style={{
          background:
            "linear-gradient(127.6deg, #5D2EEA -21.83%, #5D2EEA -11.34%, #F5F6FA 117.78%)",
        }}
      >
        <LoginForm />
      </section>
    </>
  );
}
