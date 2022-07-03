import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    // ...OTHERPROPS GET ALL PASSING VALUES LIKE BELOW, TYPE, NAME, REQUIRED, VALUES, ONCHANGE & LABEL PASSED SEPERATE...
    // <FormInput
    //     label={'Confirm Password'}
    //     type={"password"}
    //     name="conformPassword"
    //     required
    //     value={conformPassword}
    //     onChange={onChangeHandler}
    // />
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {
                // IF LABEL IS AVAILABLE, THEN ONLY WORK BELOW CODE
                label && (
                    // STRING INTERPOLATED STRING ON CLASSNAME
                    <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
                )
            }
        </div>
    );
};

export default FormInput;
