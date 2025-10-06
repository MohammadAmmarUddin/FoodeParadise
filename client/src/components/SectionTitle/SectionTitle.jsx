
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className='mx-auto text-center md:w-4/12 my-9'>
            <p className='text-orange-400 mb-3'>{subHeading}</p>
            <h3 className='text-4xl uppercase border-y-4 py-4'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;