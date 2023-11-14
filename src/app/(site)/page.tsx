import TitleSection from '@/components/landing-page/title-section'
import React from 'react'

const HomePage = () => {
  return (
    <section>
        <div 
            className="overflow-hidden 
            px-4
            sm:px-6
            mt-10
            sm:flex
            sm:flex-col
            gap-4
            md:justify-center
            md:items-center"
        >
            <TitleSection 
            pill='✨your workspace, Perfected' 
            title="All-In-One Collaboration and Productivity Platform"/>
            <div 
              className="bg-white 
              p-[2px] 
              mt-[6px]
              rounded-xl 
              bg-gradient-to-t 
              from-primary
              to-brand-primaryBlue
              sm:w-[300px]
              ">

              </div>
        </div>
    </section>
  )
}

export default HomePage