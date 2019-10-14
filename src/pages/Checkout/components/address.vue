<template>

    <div class="full-width">


    <div class="stepper">
        <div class="row d-flex justify-content-center">

            <div  class="form formSection">

                <vs-row vs-justify="space-between">
                    <vs-col vs-lg="8" vs-sm="12">
                        <div class="form-group ">

                            <vs-row class="m-2">
                                <vs-col vs-lg="12" vs-sm="12"><input style="width: 100%"
                                                                     ref="autoComplete"
                                                                     id="addressInput"
                                                                     onchange="$v.form.mainAddress.$touch();"
                                                                     @input="$v.form.mainAddress.$touch();"
                                                                     v-model="form.mainAddress" :class="{'form-control': true, 'danger': $v.form.mainAddress.$error, 'success': !$v.form.mainAddress.$error}" size="large"  placeholder="Type an address"/>
                                </vs-col>

                            </vs-row>
                            <vs-row class="m-2">
                                <vs-col vs-lg="4" vs-sm="12">
                                    <vs-input style="width: 95%"
                                              :danger="$v.form.phone_number.$error"
                                              @input="$v.form.phone_number.$touch();"
                                              :success="!$v.form.phone_number.$invalid"
                                              :danger-text="!$v.form.phone_number.required ? 'This input is required' : ' ' "
                                              v-model="form.phone_number" color="primary" placeholder="" label="Phone Number"></vs-input></vs-col>
                                <vs-col vs-lg="4" vs-sm="12">
                                    <vs-input style="width: 95%"
                                              :danger="$v.form.state.$error"
                                              @input="$v.form.state.$touch();"
                                              :success="!$v.form.state.$invalid"
                                              :danger-text="!$v.form.state.required ? 'This input is required' : ' ' "
                                              v-model="form.state" color="primary" placeholder="" label="State"></vs-input></vs-col>
                                <vs-col vs-lg="4" vs-sm="12">
                                    <vs-input style="width: 95%"
                                              :danger="$v.form.country.$error"
                                              @input="$v.form.country.$touch();"
                                              :success="!$v.form.country.$invalid"
                                              :danger-text="!$v.form.country.required ? 'This input is required' : ' ' "
                                              v-model="form.country" color="primary" placeholder="" label="Country"></vs-input></vs-col>
                            </vs-row>

                            <vs-row class="m-2">
                                <vs-col vs-lg="4" vs-sm="12">
                                    <vs-input style="width: 95%"
                                              :danger="$v.form.locality.$error"
                                              @input="$v.form.locality.$touch();"
                                              :success="!$v.form.locality.$invalid"
                                              :danger-text="!$v.form.locality.required ? 'This input is required' : ' ' "
                                              v-model="form.locality" color="primary" placeholder="" label="City"></vs-input></vs-col>
                                <vs-col vs-lg="4" vs-sm="12">
                                    <vs-input  :danger="$v.form.route.$error"
                                               @input="$v.form.route.$touch();"
                                               :success="!$v.form.route.$invalid"
                                               :danger-text="!$v.form.route.required ? 'This input is required' : ' ' "
                                               style="width: 95%" v-model="form.route" color="primary" placeholder="" label="Town"></vs-input></vs-col>
                                <vs-col vs-lg="4" vs-sm="12"><vs-input style="width: 95%" color="primary" placeholder="" label="Zip code"></vs-input></vs-col>
                            </vs-row>

                            <vs-row class="m-2">
                                <vs-col vs-lg="12" vs-sm="12">
                                    <vs-textarea style="width: 98%"
                                                 :danger="$v.form.address2.$error"
                                                 @input="$v.form.address2.$touch();"
                                                 :success="!$v.form.address2.$invalid"
                                                 :danger-text="!$v.form.address2.required ? 'This input is required' : ' ' "
                                                 v-model="form.address2" color="primary" placeholder="" label="Address"></vs-textarea></vs-col>
                            </vs-row>


                        </div>
                    </vs-col>
                    <vs-col vs-lg="3" vs-sm="12">
                        <div class="form-group">
                            <vs-row class="m-2">
                                <vs-col vs-w="12"><vs-input style="width: 98%" color="primary" label-placeholder="Card Name"></vs-input></vs-col>
                            </vs-row>

                            <vs-row class="m-2">
                                <vs-col vs-w="12"><vs-input style="width: 98%" color="primary" label-placeholder="Company Name"></vs-input></vs-col>
                            </vs-row>

                            <vs-row class="m-2">
                                <vs-col vs-lg="6" vs-sm="12"><vs-input style="width: 95%" color="primary" placeholder="01/01" label="Expiry Date"></vs-input></vs-col>
                                <vs-col vs-lg="6" vs-sm="12"><vs-input style="width: 95%" color="primary" placeholder="xxx" label="CVV"></vs-input></vs-col>
                            </vs-row>
                        </div>
                    </vs-col>
                </vs-row>

            </div>


        </div>
    </div>
    <div class="stepper-controls">
        <div class="left"><button  :disabled="!prevCanMove"  @click="stepper = 1" class="btn btn-danger">Prev</button> </div>
        <div class="right"><button :disabled="$v.form.$invalid"  @click="storeCustomer()" class="btn btn-danger">Next</button> </div>
    </div>

    </div>


</template>
<style>

    .full-width{
        width: 100%;
    }



    .stepper{
        width: 100%;
        padding: 30px;
        height: 500px;
        box-shadow: 0 3px 8px -6px rgba(0,0,0,.50);
    }
</style>
<script>

    import { required  } from 'vuelidate/lib/validators'
    import {mapMutations} from 'vuex'
    import gmapsInit from '../../../_helpers/map/gmaps'

    export default {
        name:'Address',
        data(){
            return{
                form:{
                    mainAddress:'',
                    country: '',
                    route:'',
                    phone_number: '',
                    locality:'',
                    state:'',
                    address2: '',
                    place_id: 'hhhhh',
                    companyName: ''
                },
                prevCanMove: true,
                nextCanMove: false,
                stepper: 2,
            }
        },


        async mounted(){

            try{
                const google = await gmapsInit();
                const autoComplete =  new google.maps.places.Autocomplete((this.$refs.autoComplete), {types: ['geocode']});
                autoComplete.addListener('place_changed', () => {
                    let place = autoComplete.getPlace();
                    this.form.mainAddress = place.formatted_address;
                    this.form.place_id = place.place_id;

                    for (let i = 0; i < place.address_components.length; i++) {
                        let addressType = place.address_components[i].types[0];
                        if (addressType === 'route') {
                            this.form.route = place.address_components[i].long_name;
                        }else if (addressType === 'locality'){
                            this.form.locality = place.address_components[i].long_name;
                        }else if (addressType === 'country'){
                            this.form.country = place.address_components[i].long_name;
                        }else if (addressType === 'administrative_area_level_1'){
                            this.form.state = place.address_components[i].long_name;
                        }
                    }

                })
            }catch(err){
               alert('Can\'t Connect to google to read addres')
            }
        },

        validations: {
            form: {
                mainAddress: {
                    required,
                },
                country: {
                    required,

                },
                state: {
                    required
                },
                locality:{
                    required,
                },
                route:{
                    required
                },
                phone_number: {
                    required
                },
                companyName:{

                },
                address2:{

                },
                place_id:{

                }
            }
        },

        watch:{

            stepper: function (val) {
                this.$emit('update:stepper', val)
            }
        },

        methods:{
            ...mapMutations('Cart', ['setTemporaryAddress']),

            storeCustomer(){
                this.setTemporaryAddress(this.form);
                this.stepper = 3
            }
        }

    }

</script>

<style>
    .formSection .form-control{
        border-radius: 6px;
        font-size: 14px;
    }
    .formSection .form-control:focus{
        border-color: #0882d6;
        padding-left: 20px;
        transition: all .3s ease;
        box-shadow:  0 3px 10px 0 rgba(0,0,0,.15) !important;
    }
    .formSection .form-control.danger:focus{
        border-color: #ff4f56;
    }

    .formSection .form-control.success:focus{
        border-color: green;
    }
    .formSection .span-text-validation{
        font-size: 0.65rem;
        padding: 10px;
    }
    .formSection .span-text-validation.success{
        color: green;
    }.formSection .span-text-validation.danger{
         color: #ff4f56;
     }
</style>