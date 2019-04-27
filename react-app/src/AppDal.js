import db from './db';
// TODO - at some point should split this into a Business Logic Layer
// and a (hidden) Data Access Layer
class AppDal {
    
    isEmptyOrSpaces(str){
        return str === null || str === undefined || str.match(/^ *$/) !== null;
    }
    
    isSomething(str){
        return !this.isEmptyOrSpaces(str);
    }
    
    fromDateToDateString = (date) => {
        let output = date.getFullYear() + '-';
        let m = date.getMonth();
        if(m < 9){
            output += '0'
        }
        output += (m + 1) + '-';
        let d = date.getDate();
        if(d < 10){
            output += '0'
        }
        output += d;
        return output;
    }

    today = () => {
        return(this.fromDateToDateString(new Date()));
    }

    restockMedication = (medicineId, txtRestock) => {
        let errors = [];
        let lvl = undefined;
        if(this.isEmptyOrSpaces(txtRestock)){
            errors.push({name: "err_stockAmount", msg: "You must supply a restock level" });
        }else{
            lvl = parseInt(txtRestock, 10);
            if(lvl && lvl.toString && lvl.toString() === txtRestock){
                if(lvl < 1){
                    errors.push({name: "err_stockAmount", msg: "Restock level must be more than zero" });
                }
            }else{
                errors.push({name: "err_stockAmount", msg: "You must supply a valid restock level" });
            }
        }
        if(errors.length === 0){
            // do the update
            let changes = {
                stockDate: this.today(),
                stockAmount: lvl
            };
            (async () => {
                await db.table("meds")
                    .where(":id")
                    .equals(medicineId)
                    .modify(changes);
            })();
        }
        return errors;
    }

    mustBePositiveInteger = (intText, name) => {
        let ret = { 
            isValid: false,
            value: undefined,
            msg: undefined
        }
        let lvl = undefined;
        if(this.isEmptyOrSpaces(intText)){
            ret.msg = "You must supply a " + name;
        }else{
            lvl = parseInt(intText, 10);
            if(lvl && lvl.toString && lvl.toString() === intText){
                if(lvl < 1){
                    ret.msg = name + " must be more than zero";
                }
                else{
                    ret.isValid = true;
                    ret.value = lvl;
                }
            }else{
                ret.msg = "You must supply a valid " + name;
            }
        }
        return ret;
    }

    addMedication = (medicineId, txtRestock) => {
        let errors = [];
        let restockValidation = this.mustBePositiveInteger(txtRestock, "Restock Level");
        if(!restockValidation.isValid){
            errors.push({name: "err_Restock", msg: restockValidation.msg });
        }
        if(errors.length === 0){
            // do the update
            /*
            let changes = {
                stockDate: this.today(),
                stockAmount: lvl
            };
            (async () => {
                await db.table("meds")
                    .where(":id")
                    .equals(medicineId)
                    .modify(changes);
            })();
            */
        }
        return errors;
    }

    deleteMedication = (medicineId) => {
        let errors = [];
        db.table("meds")
            .where("id")
            .equals(medicineId)
            .delete();
        return errors;
    }

}

const dal = new AppDal();

export default dal;