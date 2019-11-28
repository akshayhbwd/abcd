
import React, {Component} from 'react';
import {
    View, 
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity, 
    Image,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import {termCondition } from "../store/actions/user";
import {Button} from '../Components/button';
import Header from '../Components/Header';
import {TOSView, TOSViewWithBox} from '../Components/TOSView';
import Colors from '../styles/colors';
import { BoldText } from '../Components/styledTexts';


 class TOS extends Component {

    constructor(){
        super();

        this.state = {
            acceptAgreement:false
        }
    }

    backButtonAction() {
        this.props.navigation.goBack()
    }

    termsOfuseAction = ()  =>{

    }

    privacyPolicyAction = ()  =>{

    }

    hippaNoticeAction = ()  =>{

    }

    telehealthConsentction = ()  =>{

    }

    continueAction() {

        if(this.props.term_condition){
            this.props.navigation.goBack();
        }else{
            alert("Please accept Terms of condition.")
        }
    }

    render() {

        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                {/* <SafeAreaView style={{ flex: 1}}> */}
                 <View style={{flex: .1}}>
                        <Header
                        leftNavigation={this.props.navigation}
                        color={Colors.appColor}
                        value={'Terms & conditions'}
                        />
                    </View>
                <ScrollView style={styles.mainContainer}>

                    <TOSView
                    title='Terms of Use'
                    action={this.termsOfuseAction.bind(this)}
                    detailText={`PLEASE READ THESE TERMS OF USE CAREFULLY. THIS IS A BINDING CONTRACT. Welcome to the Q-Funds LLC ( “MyQFunds” or “we”) consisting of the website available at www.myqfunds.com (“Site”), the MyQFunds mobile application (“App”), and any other products or services provided by MyQFunds ( “Services ”). \n\n\t These Terms of Use (“Terms”) may change from time to time. We will notify you of any material changes to these Terms by posting a notice on the homepage of the Site and App for a reasonable period of time after such changes are made, email you notice of such changes to the email address on file through your registration and by changing the "Last Updated" date at the top of this webpage. We encourage you to check this page periodically for any changes. Your continued use of the Services following the posting of changes to these Terms will mean you accept those changes.\n\n\tIn addition, when using particular services or features, you shall be subject to any posted guidelines or policies applicable to such services, features or purchases that may be posted from time to time. The Privacy Policy and all such guidelines or policies are hereby incorporated by reference into these Terms. You acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, do not access or otherwise use any of the Services.`}
                    />

                    <TOSView
                    title='ACCEPTANCE OF TERMS'
                    action={this.privacyPolicyAction.bind(this)}
                    detailText="Your access to and use of the Services is subject exclusively to these Terms. You will not use the Services for any purpose that is unlawful or prohibited by these Terms. By using the Services, you are fully accepting the terms, conditions and disclaimers contained in these Terms. If you do not accept these Terms you must immediately stop using the Services. "
                    />

                    <TOSView
                    title='MINORS'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText="The Services may only be used by individuals who can form legally binding contracts under applicable law. The Services are not available to children (persons under the age of 18) or Users who have had their User account temporarily or permanently deactivated. By becoming a User, you represent and warrant that you are at least 18 years old and that you have the right, authority and capacity to enter into and abide by the Terms of this Terms. You may not allow other persons to use your User account, and you agree that you are the sole authorized user of your account."
                    />
                    
                    <TOSView
                    title='CASH BACK AND DONATIONS'
                    action={this.telehealthConsentction.bind(this)}
                    detailText={`A. You agree to comply with the terms and conditions associated with any offers, coupons, coupon codes, and other promotions available on or through the Services (“Coupons”). B. You may only redeem each Coupon once. D. You agree to comply with campaign and user limits and only use Coupons for your own personal and non-commercial use. E. You agree not to sell, barter or transfer any Coupon, or any electronic or hard copy of a coupon, to any third party. F. All Coupons provide “cash back” in the form of MyQFunds credits to your App account. The credits can only be used as donations through Orghunter. You may select the nonprofit of your choice, as offered through Orghunter, to donate your credits. Please visit Orghunter’s terms and conditions for information how they operate and how the donations will be made. The Coupons shall be governed by the following terms: \n i. The purchases and use of Coupons must be made at a brick-and-mortar store.\nii. Some Coupons are store-specific and require that the product is purchased from a particular store listed in details of the offer. \niii. Coupons may not be combined with other manufacturer or retailer coupons, discounts, or rebates for the same product. We will reject any Coupon usage for products purchased using other manufacturer or retailer coupons, discounts or rebates.\niv. Unless otherwise stated in the Coupon, you must activate the Coupon prior to purchase.\nv. We have sole discretion to determine whether you have complied with all applicable offer terms, including the Terms herein. We reserve the right to request additional information in order to verify the identity of the purchaser or the validity of the proof of purchase.\nG. MyQFunds will not be liable for any actions or inactions of Orghunter. We cannot guarantee the validity of any non-profits, or associated information, listed through their services. Furthermore, we cannot guarantee that any donations will actually end up with the selected non-profit. Your sole remedy for any issues or liabilities related to your donations shall be to bring a claim against Orghunter.`}
                    />
                    <TOSView
                    title='USER LICENSE'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`The Services are owned and operated by MyQFunds. Unless otherwise indicated, all content, information, and other materials on the Services, including, without limitation, MyQFunds’s trademarks and logos, the visual interfaces, graphics, design, compilation, information, software, computer code (including source code or object code), services, text, pictures, information, data, sound files, other files and the selection and arrangement thereof (collectively, the “Materials”) are protected by relevant intellectual property and proprietary rights and laws. All Materials contained on the Services are the property of MyQFunds or its subsidiaries or affiliated companies and/or third-party licensors. Unless otherwise expressly stated in writing by MyQFunds, by agreeing to these Terms you are granted a limited, non-sublicensable license (i.e. a personal and limited right) to access and use the Services for your personal use or internal business use only.\n\n\tMyQFunds reserves all rights not expressly granted in these Terms. This license is subject to these Terms and does not permit you to engage in any of the following: (a) resale or commercial use of the Services or the Materials; (b) distribution, public performance or public display of any Materials; (c) modifying or otherwise making any derivative uses of the Services or the Materials, or any portion of them; (d) use of any data mining, robots or similar data gathering or extraction methods; (e) downloading (except page caching) of any portion of the Services, the Materials, or any information contained in them, except as expressly permitted on the Services; or (f) any use of the Services or the Materials except for their intended purposes. Any use of the Services or the Materials except as specifically authorized in these Terms, without the prior written permission of MyQFunds, is strictly prohibited and may violate intellectual property rights or other laws. Unless explicitly stated in these Terms, nothing in them shall be interpreted as conferring any license to intellectual property rights, whether by estoppel, implication or other legal principles. MyQFunds can terminate this license at any time, without notice, including where we reasonably consider that: (a) your use of the Services violates these Terms or applicable law; (b) you fraudulently use or misuse the Services; or (c) we are unable to continue providing the Services to you due to technical or legitimate business reasons.`}
                    />
                    <TOSView
                    title='USER ACCOUNTS'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`Your Information is any information you provide, publish or post to or through the Services, including any profile information you provide (your “Information”). You consent to us using your Information to create a User account that will allow you to use the Services and participate in the Services. Our collection and use of personal information in connection with the Services is as provided in MyQFunds’s Privacy Policy located at ________. You agree to provide and maintain accurate, current and complete information and that we and our Service Providers may rely on your Information as accurate, current and complete. To enable MyQFunds to use your Information for the purposes described in the Privacy Policy and these Terms, you grant to us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, transferable, sub-licensable (through multiple tiers) right and license to exercise the copyright, publicity, and database rights you have in your Information, and to use, copy, perform, display and distribute such Information to prepare derivative works, or incorporate into other works, such Information, in any media now known or not currently known. MyQFunds does not assert any ownership over your Information; rather, as between you and MyQFunds, subject to the rights granted to us in these Terms, you retain full ownership of all of your Information and any intellectual property rights or other proprietary rights associated with your Information.`}
                    />
                    <TOSView
                    title='INTELLECTUAL PROPERTY'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`All intellectual property rights in the Services shall be owned by MyQFunds absolutely and in their entirety. These rights include database rights, copyright, design rights (whether registered or unregistered), trademarks (whether registered or unregistered) and other similar rights wherever existing in the world together with the right to apply for protection of the same. All other trademarks, logos, service marks, company or product names set forth in the Services are the property of their respective owners. You acknowledge and agree that any questions, comments, suggestions, ideas, feedback or other information (“Submissions”) provided by you to us are non-confidential and shall become the sole property of MyQFunds. MyQFunds shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any purpose, commercial or otherwise, without acknowledgment or compensation to you.\n\tMyQFunds and other MyQFunds logos, designs, graphics, icons, scripts and service names are registered trademarks, trademarks or trade dress of MyQFunds in the United States and/or other countries (collectively, the “MyQFunds Marks”). You acknowledge that MyQFunds is the owner and licensor of the MyQFunds Marks.\n\tYou agree that you will not: (1) create any materials that use the MyQFunds Marks or any derivatives of the MyQFunds Marks as a trademark, service mark, trade name or trade dress, other than as expressly approved by MyQFunds in writing; (2) use the MyQFunds Marks in any way that tends to impair their validity as proprietary trademarks, service marks, trade names or trade dress, or use the MyQFunds Marks other than in accordance with the terms, conditions and restrictions herein; (3) take any other action that would jeopardize or impair MyQFunds’s rights as owner of the MyQFunds Marks or the legality and/or enforceability of the MyQFunds Marks, including, challenging or opposing MyQFunds’s ownership in the MyQFunds Marks; (4) apply for trademark registration or renewal of trademark registration of any of the MyQFunds Marks, any derivative of the MyQFunds Marks, any combination of the MyQFunds Marks and any other name, or any trademark, service mark, trade name, symbol or word which is similar to the MyQFunds Marks; (5) use the MyQFunds Marks on or in connection with any product, service or activity that is in violation of any law, statute, government regulation or standard.`}
                    />
                    <TOSView
                    title='DISCLAIMERS AND LIMITATION OF LIABILITY'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`The following disclaimers are made on behalf of MyQFunds, our affiliates, subsidiaries, parents, successors and assigns, and each of our respective officers, directors, employees, agents, and shareholders.\n\tMyQFunds does not provide discount services, and MyQFunds is not a nonprofit corporation. It is up to you to decide whether or not to use a Coupon and purchase any goods of a Merchant. We cannot guarantee the accuracy or validity of any Coupon. Furthermore, it is also entirely up to you to decide when, where and how much of the “cash back” to a charity through Orgunter. We have no control over the quality or accuracy of the offers, goods or services that are provide through and as a result of the Services.\n\tThe Service is provided on an “as is” basis and without any warranty or condition, express, implied or statutory. We do not guarantee and do not promise any specific results from use of the Services, including the ability to provide or receive Services at any given location or time. To the fullest extent permitted by law, we specifically disclaim any implied warranties of title, merchantability, fitness for a particular purpose and non-infringement. Some states do not allow the disclaimer of implied warranties, so the foregoing disclaimer may not apply to you.\n\tWe do not warrant that your use of the Services will be accurate, complete, reliable, current, secure, uninterrupted, always available, or error- free, or will meet your requirements, that any defects in the Services will be corrected, or that the Services is free of viruses or other harmful components. We disclaim liability for, and no warranty is made with respect to, connectivity and availability of the Services.\n\tMyQFunds is not responsible for the validity of a Coupon or its terms provided by a Merchant, whether online or offline. You are solely responsible for your interactions with the Merchants. By participating in the Services, you agree to accept such risks and agree that MyQFunds is not responsible for the acts or omissions of any Merchants.\n\tYou are responsible for the use of your User account and MyQFunds expressly disclaims any liability arising from the unauthorized use of your User account. Should you suspect that any unauthorized party may be using your User account or you suspect any other breach of security, you agree to notify us immediately.\n\tMyQFunds advises you to use the Services with a data plan with unlimited or very high data usage limits, and MyQFunds shall not responsible or liable for any fees, costs, or overage charges associated with any data plan you use to access the Services.\n\t IN NO EVENT WILL MYQFUNDS, INCLUDING OUR AFFILIATES, SUBSIDIARIES, PARENTS, SUCCESSORS AND ASSIGNS, AND EACH OF OUR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR SHAREHOLDERS (COLLECTIVELY “MYQFUNDS” FOR PURPOSES OF THIS SECTION), BE LIABLE TO YOU FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, CONSEQUENTIAL, OR INDIRECT DAMAGES (INCLUDING DAMAGES FOR DELETION, CORRUPTION, LOSS OF DATA, LOSS OF PROGRAMS, FAILURE TO STORE ANY INFORMATION OR OTHER CONTENT MAINTAINED OR TRANSMITTED BY THE SERVICES, SERVICE INTERRUPTIONS, OR FOR THE COST OF PROCUREMENT OF SUBSTITUTE SERVICES) ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, THE SERVICES, OR THIS AGREEMENT, HOWEVER ARISING INCLUDING NEGLIGENCE, EVEN IF WE OR OUR AGENTS OR REPRESENTATIVES KNOW OR HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. THE SERVICES MAY BE USED BY YOU TO RECEIVE DISCOUNT COUPONS GOODS OR OTHER SERVICES WITH THIRD PARTY MERCHANTS, BUT YOU AGREE THAT MYQFUNDS HAS NO RESPONSIBILITY OR LIABILITY TO YOU RELATED TO ANY COUPONS, GOODS OR OTHER SERVICES PROVIDED TO YOU BY THIRD PARTY MERCHANTS OTHER THAN AS EXPRESSLY SET FORTH IN THIS AGREEMENT. CERTAIN JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.`}
                    />
                    <TOSView
                    title='INDEMNITY'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`You will defend, indemnify, and hold MyQFunds including our affiliates, subsidiaries, parents, successors and assigns, and each of our respective officers, directors, employees, agents, or shareholders harmless from any claims, actions, suits, losses, costs, liabilities and expenses (including reasonable attorneys’ fees) relating to or arising out of your use of the Services and participation in the Services, including: (1) your breach of these Terms or the documents it incorporates by reference; (2) your violation of any law or the rights of a third party, including, Drivers, Riders, other motorists, and pedestrians, as a result of your own interaction with such third party; (3) any allegation that any materials that you submit to us or transmit through the Services or to us infringe or otherwise violate the copyright, trademark, trade secret or other intellectual property or other rights of any third party; (4) your ownership, use or operation of a motor vehicle or passenger vehicle, including your provision of Services as a Driver; and/or (5) any other activities in connection with the Services. This indemnity shall be applicable without regard to the negligence of any party, including any indemnified person.`}
                    />
                    <TOSView
                    title='LINKS TO THIRD PARTY WEBSITES'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`The Services may include links to third party websites that are controlled and maintained by others. Any link to other websites is not an endorsement of such websites and you acknowledge and agree that we are not responsible for the content or availability of any such sites.`}
                    />
                    <TOSView
                    title='OPTIONAL TOOLS'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools, “as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the Site or App, or as a function of the Service, is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the App or Site (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms.\n\tAdditionally, MyQFunds may provide other third-party content on the Services (collectively the “Third-Party Content”). MyQFunds does not control or endorse any Third-Party Content and makes no representation or warranties of any kind regarding the Third-Party Content, including without limitation regarding its accuracy or completeness. Please be aware that we do not create Third Party Content, update, or monitor it. Therefore, we are not responsible for any Third-Party Content on the Services.`}
                    />
                    <BoldText style={{marginLeft:5, marginTop:5}} >TERMINATION</BoldText>
                    <TOSView
                    title='MyQFunds Termination'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`To the fullest extent permitted by applicable law, MyQFunds reserves the right, without notice and in our sole discretion, to terminate your license to use the Services and to block or prevent your future access to and use of the Services, including where we reasonably consider that:\n (a) your use of the Services violates these Terms or applicable law;\n (b) you fraudulently use or misuse the Services; or\n (c) we are unable to continue providing the Services to you due to technical or legitimate business reasons. To the fullest extent permitted by applicable law, your only remedy with respect to any dissatisfaction with \n(i) the Services, \n(ii) any term of these Terms, \n(iii) any policy or practice of MyQFunds in operating the Services, or \n(iv) any content or information transmitted through the Services, is to terminate your account and to discontinue use of any and all parts of the Services.`}
                    />
                    <TOSView
                    title='User Termination.'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`You may deactivate or remove your account at any time for any reason by or by emailing us at support@myqfunds.com. Please allow up to seven (7) days for MyQFunds to deactivate and remove your account.`}
                    />
                    <TOSView
                    title='FORCE MAJEURE'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`Neither party shall be liable to the other for any failure to perform any obligation under any Terms which is due to an event beyond the control of such party including but not limited to any Act of God, terrorism, war, Political insurgence, insurrection, riot, civil unrest, act of civil or military authority, uprising, earthquake, flood or any other natural or man-made eventuality outside of our control, which causes the termination of an agreement or contract entered into, nor which could have been reasonably foreseen. Any Party affected by such event shall forthwith inform the other Party of the same and shall use all reasonable endeavors to comply with the Terms of any agreement contained herein.`}
                    />
                    <TOSView
                    title='WAIVER'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`Failure of either Party to insist upon strict performance of any provision of this or any Terms or the failure of either Party to exercise any right or remedy to which it, he or they are entitled hereunder shall not constitute a waiver thereof and shall not cause a diminution of the obligations under this or any Terms. No waiver of any of the provisions of this or any Terms shall be effective unless it is expressly stated to be such and signed by both Parties.`}
                    />
                    <TOSView
                    title='SEVERANCE'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`If any of these Terms should be determined to be invalid, illegal or unenforceable for any reason by any court of competent jurisdiction then such Term or Condition shall be severed and the remaining Terms shall survive and remain in full force and effect and continue to be binding and enforceable.`}
                    />
                    <TOSView
                    title='GOVERNING LAW AND JURISDICTION'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`These Terms, the Privacy Policy and any separate agreements whereby we provide you services shall be governed by the laws of the State of California. The parties agree exclusive jurisdiction shall be in Santa Clara County, California for any and all issues arising out of the Terms or any related documents or transactions.`}
                    />
                    <TOSView
                    title='ASSIGNMENT'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`These Terms, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be assigned by MyQFunds without restriction. Any assignment attempted to be made in violation of these Terms shall be void.`}
                    />
                    <TOSView
                    title='ENTIRE AGREEMENT'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`The Terms, together the Privacy Policy, is the entire agreement between you and MyQFunds relating to the subject matter herein and will not be modified except in writing, signed or otherwise agreed to by both parties, or by a change to these Terms made by MyQFunds as set forth above. Any ambiguities in the interpretation of these Terms shall not be construed against the drafting party.`}
                    />
                    <TOSView
                    title='AGREEMENT SHALL BE BINDING'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`These Terms shall be binding upon, and inure to the benefit of, the heirs, executors, administrators, successors and assigns of the parties [unless to the contrary specifically provided in any particular covenant, term or condition hereof].`}
                    />
                    <TOSView
                    title='ARBITRATION AGREEMENT'
                    action={this.hippaNoticeAction.bind(this)}
                    detailText={`In the event of any dispute or controversy arising out of, or relating to, this Terms, the parties hereto agree to submit such dispute or controversy to arbitration in accordance with the California Code of Civil Procedure Sections 1280 et seq.  The sole arbitrator shall be selected from the list (the “List”) of arbitrators supplied by the J.A.M.S. Santa Clara County, California office, or any successor entity, or if it no longer exists, from a List supplied by the American Arbitration Association (“JAMS”) following written request by any party hereto.  If the parties hereto after notification of the other party(ies) to such dispute cannot agree upon an arbitrator within thirty (30) days following receipt of the List by all parties to such arbitration, then either party may request, in writing, that JAMS appoint an arbitrator within ten (10) days following receipt of such request (the “Arbitrator”).  The arbitration shall take place in Santa Clara County, California, at a place and time mutually agreeable to the parties or if no such agreement is reached within ten (10) days following notice from the Arbitrator, at a place and time determined by the Arbitrator.  The parties hereto agree that all actions or proceedings arising in connection with this Terms shall be arbitrated exclusively in Santa Clara County, California.  The aforementioned choice of venue is intended by the parties to be mandatory and not permissive in nature, thereby precluding the possibility of litigation between the parties with respect to or arising out of this Terms in any jurisdiction other than that specified in this Section.  Each party hereby waives any right it may have to assert the doctrine of forum non conveniens or similar doctrine or to object to venue with respect to any proceeding brought in accordance with this Section, and stipulates that the Arbitrator shall have in personam jurisdiction and venue over each of them for the purpose of litigating any dispute, controversy, or proceeding arising out of or related to this Terms.  Each party hereby authorizes and accepts service of process sufficient for personal jurisdiction in any action against it as contemplated by this Section by registered or certified mail, return receipt requested, postage prepaid, to its address for the giving of notices as set forth in this Terms.  The decision of the Arbitrator shall be final and binding on all the parties to the arbitration and may be enforced by a court of competent jurisdiction.  In addition to attorney's fees as provided in this Terms, the prevailing party shall be entitled to recover from the non-prevailing party its reasonable costs and expenses.  The costs and fees of the arbitration shall be paid by the non-prevailing party.  The Arbitrator may grant any remedy appropriate including, without limitation, injunctive relief or specific performance.  Prior to the appointment of the Arbitrator, any party may seek temporary equitable or injunctive relief from the Santa Clara County Superior Court which shall be effective until a final decision is rendered by the Arbitrator.`}
                    />
                    
                    <TOSViewWithBox
                    title={`Waiver of Jury Trial.`}
                    detailText={`THE PARTIES HEREBY WAIVE THEIR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY, instead electing that all claims and disputes shall be resolved by arbitration. Arbitration procedures are typically more limited, more efficient and less costly than rules applicable in a court and are subject to very limited review by a court. In the event any litigation should arise between you and MyQFunds in any state or federal court in a suit to vacate or enforce an arbitration award or otherwise, YOU AND MyQFunds WAIVE ALL RIGHTS TO A JURY TRIAL, instead electing that the dispute be resolved by a judge.`}
                    />
                    <TOSViewWithBox
                    title={`Waiver of Class or Consolidated Actions.`}
                    detailText={`TO THE EXTENT PERMITTED BY APPLICABLE LAW, ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THESE TERMS MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER.`}
                    />


                    <View style={{
                        flexDirection:'row',
                        marginHorizontal:'5%',
                    alignItems:'center',
                    marginTop:30
                    }}>
                        <TouchableOpacity onPress={()=>{
                            this.props.termCondition()
                            }}
                            >
                            {
                                this.props.term_condition ? (
                                    <Image source={require('../assets/check-square.png')}
                                    style={{height:25,width:25}}
                                    >
                                    </Image>
                                ) : (
                                    <Image source={require('../assets/check_box.png')}
                                    style={{height:25,width:25}}
                                    >
                                    </Image>
                                )
                            }
                            
                        </TouchableOpacity>
                        <Text style={{
                            marginLeft:10,
                            fontSize:12,
                            color:'gray'
                        }}>
                            "I have read and understand the information provided above and agree to these contracts."
                        </Text>
                    </View>
                    <View style={{ flex:1}}>
                            <Button
                                value={'NEXT'}
                                color={Colors.appColor}
                                Light={true}
                                textStyle={{fontSize: 20}}
                                onPress ={() => this.continueAction()}
                            />
                        </View>
                </ScrollView>
                {/* </SafeAreaView> */}
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return{
        term_condition: state.user.term_Condition,
    }
  };
  
  const mapDispatchToProps = dispatch =>{
    return {
        termCondition: () => {
            dispatch(termCondition());
        },
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TOS);

const styles = StyleSheet.create({
    mainContainer:{flex:1,backgroundColor:'white'},
});