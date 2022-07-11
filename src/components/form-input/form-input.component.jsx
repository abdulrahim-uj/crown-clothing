import { FormInputLabel, Group, Input } from './form-input.styles';

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
        <Group>
            <Input {...otherProps} />
            {
                // IF LABEL IS AVAILABLE, THEN ONLY WORK BELOW CODE
                label && (
                    // STRING INTERPOLATED STRING ON CLASSNAME
                    <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
                )
            }
        </Group>
    );
};

export default FormInput;
