import React from 'react'

import { FormattedMessage, injectIntl } from 'react-intl'

import ImageUpload from 'src/components/ImageUpload'
import {
    HelAutoComplete,
    MultiLanguageField,
    HelTextField,
    HelLabeledCheckboxGroup,
    HelLanguageSelect,
    HelDatePicker,
    HelTimePicker,
    HelCheckbox,
    HelSelect
} from 'src/components/HelFormFields'


import {mapKeywordSetToForm, mapLanguagesSetToForm} from 'src/utils/apiDataMapping.js'

import API from 'src/api.js'

import {connect} from 'react-redux'

let FormHeader = (props) => (
    <div className="row">
        <legend className="col-sm-12">{ props.children }</legend>
    </div>
)

let SideField = (props) => (
    <div className="side-field col-sm-5 col-sm-push-1">
        { props.children }
    </div>
)

/*
let updateEventHidden = function(eventData) {
    return (
        <div>
            <Input
                type="hidden"
                name="data_source"
                value={eventData.data_source}
            />
            <Input
                type="hidden"
                name="publisher"
                value={eventData.publisher}
            />
            <Input
                type="hidden"
                name="id"
                value={eventData.id}
                />
        </div>
    )
};
 */

class FormFields extends React.Component {

    constructor(props) {
        super(props)

        let languages = this.props.editor.values['presentation-languages'] || ['fi']

        this.state = {
            languages: languages
        }
    }

    render() {

        let helMainOptions = mapKeywordSetToForm(this.props.editor.keywordSets, 'helfi:topics')
        let helTargetOptions = mapKeywordSetToForm(this.props.editor.keywordSets, 'helfi:audiences')
        let helEventLangOptions = mapLanguagesSetToForm(this.props.editor.languages)

        return (
            <div>
                <div className="col-sm-12 highlighted-block">
                    <div className="col-xl-6">
                        <label>
                            <FormattedMessage id="event-presented-in-languages"/>
                        </label>
                    </div>
                    <div className="col-xl-6">
                        <div className="spread-evenly">
                            <HelLanguageSelect name="presentation-languages" options={API.eventInfoLanguages()} defaultSelected={this.state.languages} onChange={(array) => {this.setState({languages: array})}}/>
                        </div>
                    </div>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-description-fields-header"/>
                </FormHeader>

                <div className="row">
                    <div className="col-sm-6">
                        <MultiLanguageField required={true} multiLine={false} label="event-headline" name="name" languages={this.state.languages} />
                        <MultiLanguageField required={true} multiLine={true} label="event-short-description" name="short_description" languages={this.state.languages} />
                        <MultiLanguageField required={false} multiLine={true} label="event-description" name="description" languages={this.state.languages} />
                        <MultiLanguageField required={false} multiLine={false} label="event-info-url" name="info_url" languages={this.state.languages} validations={['isUrl']} />
                    </div>
                    <SideField>
                        <label><FormattedMessage id="event-picture"/></label>
                        <ImageUpload name="image" />
                    </SideField>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-datetime-fields-header" />
                </FormHeader>
                <div className="row">
                    <div className="col-sm-6">
                        <HelDatePicker name="starting_date" textFieldStyle={{ fontSize: '20px' }} floatingLabelText={<FormattedMessage id="event-starting-date"/>} />
                        <HelTimePicker format="24hr" name="starting_time" textFieldStyle={{ fontSize: '20px' }} floatingLabelText={<FormattedMessage id="event-starting-time"/>} />
                        <HelDatePicker name="ending_date" textFieldStyle={{ fontSize: '20px' }} floatingLabelText={<FormattedMessage id="event-ending-date"/>} />
                        <HelTimePicker format="24hr" name="ending_time" textFieldStyle={{ fontSize: '20px' }} floatingLabelText={<FormattedMessage id="event-ending-time"/>} />
                    </div>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-location-fields-header" />
                </FormHeader>
                <div className="row">
                    <div className="col-sm-6">
                        <HelAutoComplete required={true} name="location_id" />
                        <MultiLanguageField multiLine={true} label="event-location-additional-info" name="location_extra_info" languages={this.state.languages} />
                    </div>
                    <SideField>
                        <p>Aloita kirjoittamaan kenttään tapahtumapaikan nimen alkua ja valitse oikea paikka alle ilmestyvästä listasta. Jos et löydä paikkaa tällä tavoin, kirjoita tapahtumapaikka tai osoite lisätietokenttään.</p>
                    </SideField>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-price-fields-header" />
                </FormHeader>
                <div className="row">
                    <div className="col-sm-6">
                        <HelCheckbox name="offers_is_free" label={<FormattedMessage id="is-free"/>} />
                        <MultiLanguageField name="offers_price" label="event-price" languages={this.state.languages} />
                        <MultiLanguageField multiLine={true} label="event-price-info" name="offers_description" languages={this.state.languages} />
                        <MultiLanguageField  name="offers_info_url" label="event-purchase-link" languages={this.state.languages} />
                    </div>
                    <SideField>
                        <p>Valitse onko tapahtumaan vapaa pääsy tai lisää tapahtuman hinta tekstimuodossa (esim. 5€/7€).</p>
                        <p>Voit lisätä lisätietoja tapahtuman lipunmyynnistä, paikkavarauksista jne.</p>
                        <p>Lisää myös mahdollinen linkki lipunmyyntiin.</p>
                    </SideField>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-social-media-fields-header" />
                </FormHeader>
                <div className="row">
                    <div className="col-sm-6">
                        <HelTextField validations={['isUrl']} name="extlink_facebook" label={<FormattedMessage id="facebook-url"/>} />
                        <HelTextField validations={['isUrl']} name="extlink_twitter" label={<FormattedMessage id="twitter-url"/>} />
                        <HelTextField validations={['isUrl']} name="extlink_instagram" label={<FormattedMessage id="instagram-url"/>} />
                    </div>
                </div>

                <FormHeader>
                    <FormattedMessage id="event-categorization" />
                </FormHeader>
                <div className="row">
                    <HelLabeledCheckboxGroup groupLabel={<FormattedMessage id="hel-main-categories"/>}
                                    name="hel_main"
                                    itemClassName="col-sm-6"
                                    options={helMainOptions} />
                    <HelSelect legend={"Kategoriat"} name="keywords" resource="keyword" dataSource={`${appSettings.api_base}/keyword/?data_source=yso&filter=`} />
                    <HelLabeledCheckboxGroup groupLabel={<FormattedMessage id="hel-target-groups"/>}
                                    name="hel_target"
                                    itemClassName="col-sm-6"
                                    options={helTargetOptions} />
                    <HelLabeledCheckboxGroup groupLabel={<FormattedMessage id="hel-event-languages"/>}
                                    name="in_language"
                                    itemClassName="col-sm-6"
                                    options={helEventLangOptions} />
                </div>
            </div>
        )
    }
}

// <HelSelect legend={"Kohderyhmät"} name="audience" resource="keyword" dataSource={`${appSettings.api_base}/keyword/?data_source=yso&filter=`} />

// Inject dispatch and intl into props
export default connect()(injectIntl(FormFields))
