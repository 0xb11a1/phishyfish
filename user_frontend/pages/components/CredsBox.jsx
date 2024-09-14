import logo from "../../public/logo.png"
import Image from "next/image"
export default function CredsBox ({curr_component}) {

    

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ">
        <div className="md:w-1/3 max-w-sm">
          {/* <img
            src="/logo.png"
          /> */}
        <Image src={logo} alt="something" height={200} width={400}/>

        </div>
        {curr_component}
      </section>
    )

}