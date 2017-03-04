using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore;
using Sitecore.Data.Validators;
using Sitecore.Data.Validators.FieldValidators;

namespace AfternoonDelight.Feature.Media.FieldValidators
{
    [Serializable]
    public class DoubleRangeValidator : IntegerRangeValidator
    {
        public override string Name
        {
            get
            {
                return "Double Range";
            }
        }

        protected override ValidatorResult Evaluate()
        {
            string controlValidationValue = ControlValidationValue;
            if (string.IsNullOrEmpty(controlValidationValue))
            {
                return ValidatorResult.Valid;
            }

            double result;
            if (!double.TryParse(controlValidationValue, out result))
            {
                Text = GetText("Field \"{0}\" must be a double.", this.GetFieldDisplayName());
                return GetFailedResult(ValidatorResult.Error);
            }

            double double1;
            if (!double.TryParse(Parameters["Min"], out double1))
            {
                Text = GetText("Field \"{0}\" must be a double.", this.GetFieldDisplayName());
                return GetFailedResult(ValidatorResult.Error);
            }

            double double2;
            if (!double.TryParse(Parameters["Max"], out double2))
            {
                Text = GetText("Field \"{0}\" must be a double.", this.GetFieldDisplayName());
                return GetFailedResult(ValidatorResult.Error);
            }

            if (result < double1)
            {
                Text = GetText("The field \"{0}\" must contain a value greater than or equal to {1}.", GetFieldDisplayName(), double1.ToString());
                return GetFailedResult(ValidatorResult.Error);
            }

            if (result <= double2)
            {
                return ValidatorResult.Valid;
            }
            Text = GetText("The field \"{0}\" must contain a value lesser than or equal to {1}.", GetFieldDisplayName(), double2.ToString());
            return GetFailedResult(ValidatorResult.Error);
        }
    }
}