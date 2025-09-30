'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function VisaApplicationPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    currentNationality: '',
    nationalityAtBirth: '',
    otherNationalities: '',
    sex: '',
    civilStatus: '',
    otherCivilStatus: '',
    
    // Travel Document
    travelDocument: '',
    otherTravelDocument: '',
    passportNumber: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    passportIssuedBy: '',
    
    // Residence
    residenceOtherCountry: '',
    residenceOtherCountryDetails: '',
    parentalAuthority: '',
    
    // Visa Details
    numberOfEntries: '',
    purposeOfVisit: '',
    intendedArrivalDate: '',
    intendedDepartureDate: '',
    memberStateOfFirstEntry: '',
    memberStateOfDestination: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle form data updates
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle application submission
  const handleApplicationSubmission = () => {
    if (confirm('Are you sure you want to proceed to application review?')) {
      // Store form data in localStorage to pass to application-review page
      localStorage.setItem('visaApplicationData', JSON.stringify(formData));
      router.push('/application-review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Schengen Visa Application</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cosmoprof Worldwide 2026</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Form Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="grid grid-cols-3 gap-4 items-center">
                             {/* EU Flag */}
               <div className="flex justify-center">
                 <Image 
                   src="/images/eu-flag.jpg" 
                   alt="EU Flag" 
                   width={96} 
                   height={64} 
                   className="rounded"
                 />
               </div>

                             {/* Italian Embassy */}
               <div className="text-center">
                 <div className="mb-2">
                                       {/* Italian Emblem */}
                    <div className="w-24 h-24 mx-auto">
                      <Image 
                        src="/images/italian-emblem.jpg" 
                        alt="Italian Emblem" 
                        width={96} 
                        height={96} 
                        className="rounded-full"
                      />
                    </div>
                 </div>
                 
                 <div className="text-sm font-semibold">Ambasciata d&apos;Italia</div>
                 <div className="text-sm">Baghdad</div>
               </div>

                             {/* Photo Space */}
               <div className="flex justify-center">
                 <Image 
                   src="/images/photo-placeholder.jpg" 
                   alt="Photo Placeholder" 
                   width={96} 
                   height={128} 
                   className="border-2 border-gray-300 rounded"
                 />
               </div>
            </div>
          </div>

          {/* Form Title */}
          <div className="p-6 border-b border-gray-200">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Harmonised application form</h2>
              <h3 className="text-xl font-semibold text-gray-800">Application for Schengen Visa</h3>
              <p className="text-sm text-gray-600 mt-2">This application form is free</p>
            </div>

            {/* Instructions */}
            <div className="text-sm text-gray-700 space-y-2">
              <p>Family members of EU, EEA or CH citizens shall not fill in fields no.21, 22, 30, 31 and 32 (marked with*).</p>
              <p>Fields 1-3 shall be filled in in accordance with the data in the travel document.</p>
            </div>
          </div>

                                 {/* Form Content */}
            <div className="p-6">

                           {/* Form Fields Container */}
              <div className="space-y-6">
                                 {/* First Row of Fields */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Left Side - Form Fields */}
                   <div className="lg:col-span-2 space-y-4">
                     {/* Field 1: Surname */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">1.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Surname (Family name):
                           </label>
                           <input 
                             type="text" 
                             value="BEETARWEIMI"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>

                     {/* Field 2: Surname at birth */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">2.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Surname at birth (Former family name(s)):
                           </label>
                           <input 
                             type="text" 
                             value="BEETARWEIMI"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>

                     {/* Field 3: First name */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">3.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             First name(s) (Given name(s)):
                           </label>
                           <input 
                             type="text" 
                             value="SAJJAD"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Right Side - Official Use */}
                   <div className="lg:col-span-1">
                     <div className="border-2 border-gray-400 rounded-lg p-4 bg-gray-50">
                       <h4 className="text-lg font-bold text-gray-800 mb-4 text-center border-b border-gray-400 pb-2">
                         For official use only
                       </h4>
                       
                       <div className="space-y-4">
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Date of application:
                           </label>
                           <div className="h-12 border border-gray-300 bg-white rounded-lg flex items-center px-3">
                             <span className="text-gray-500 text-sm">Date will be filled by officials</span>
                           </div>
                         </div>
                         
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Application number:
                           </label>
                           <div className="h-12 border border-gray-300 bg-white rounded-lg flex items-center px-3">
                             <span className="text-gray-500 text-sm">Number will be assigned by officials</span>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Second Row of Fields */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {/* Left Column */}
                   <div className="space-y-4">
                     {/* Field 4: Date of birth */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">4.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Date of birth (day-month-year):
                           </label>
                           <input 
                             type="text" 
                             value="September 4, 1996"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>

                     {/* Field 5: Place of birth */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">5.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Place of birth:
                           </label>
                           <input 
                             type="text" 
                             value="Basra"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>

                     {/* Field 6: Country of birth */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">6.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Country of birth:
                           </label>
                           <input 
                             type="text" 
                             value="Iraq"
                             readOnly
                             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                           />
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Right Column */}
                   <div className="space-y-4">
                     {/* Field 7: Current nationality */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1">7.</span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Current nationality:
                           </label>
                           <input 
                             type="text" 
                             value={formData.currentNationality}
                             onChange={(e) => handleInputChange('currentNationality', e.target.value)}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                             placeholder="Enter current nationality"
                           />
                           
                           <div className="space-y-3">
                             <div>
                               <label className="block text-sm font-medium text-gray-600 mb-1">
                                 Nationality at birth, if different:
                               </label>
                               <input 
                                 type="text" 
                                 value={formData.nationalityAtBirth}
                                 onChange={(e) => handleInputChange('nationalityAtBirth', e.target.value)}
                                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter nationality at birth if different"
                               />
                             </div>
                             
                             <div>
                               <label className="block text-sm font-medium text-gray-600 mb-1">
                                 Other nationalities:
                               </label>
                               <input 
                                 type="text" 
                                 value={formData.otherNationalities}
                                 onChange={(e) => handleInputChange('otherNationalities', e.target.value)}
                                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter other nationalities if any"
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Application lodged at */}
                     <div className="border border-gray-300 rounded-lg p-4">
                       <div className="flex items-start space-x-3">
                         <span className="text-lg font-bold text-gray-700 mt-1"></span>
                         <div className="flex-1">
                           <label className="block text-sm font-medium text-gray-700 mb-3">
                             Application lodged at:
                           </label>
                           
                           <div className="space-y-2">
                             <label className="flex items-center space-x-3 cursor-pointer">
                               <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                               <span className="text-sm text-gray-700">Embassy/consulate</span>
                             </label>
                             
                             <label className="flex items-center space-x-3 cursor-pointer">
                               <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                               <span className="text-sm text-gray-700">Service provider</span>
                             </label>
                             
                             <label className="flex items-center space-x-3 cursor-pointer">
                               <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                               <span className="text-sm text-gray-700">Commercial intermediary</span>
                             </label>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                                   </div>

                  {/* Third Row of Fields */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Field 8: Sex */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg font-bold text-gray-700 mt-1">8.</span>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Sex:
                          </label>
                          
                          <div className="space-y-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="sex" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Male</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="sex" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Female</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Middle Column - Field 9: Civil status */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg font-bold text-gray-700 mt-1">9.</span>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Civil status:
                          </label>
                          
                          <div className="space-y-2">
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Single</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Married</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Registered Partnership</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Separated</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Divorced</span>
                            </label>
                            
                            <label className="flex items-center space-x-3 cursor-pointer">
                              <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                              <span className="text-sm text-gray-700">Widow(er)</span>
                            </label>
                            
                            <div className="mt-3">
                              <label className="flex items-center space-x-3 cursor-pointer mb-2">
                                <input type="radio" name="civil_status" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-sm text-gray-700">Other (please specify):</span>
                              </label>
                              <input 
                                type="text" 
                                value={formData.otherCivilStatus}
                                onChange={(e) => handleInputChange('otherCivilStatus', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Specify other civil status"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Border (Name) */}
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-lg font-bold text-gray-700 mt-1"></span>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Border (Name):
                          </label>
                          
                          <div className="space-y-3">
                            <div>
                              <input 
                                type="text" 
                                value={formData.residenceOtherCountry}
                                onChange={(e) => handleInputChange('residenceOtherCountry', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter border name"
                              />
                            </div>
                            
                            <div>
                              <input 
                                type="text" 
                                value={formData.residenceOtherCountryDetails}
                                onChange={(e) => handleInputChange('residenceOtherCountryDetails', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter border name"
                              />
                            </div>
                            
                            <div className="mt-4">
                              <label className="flex items-center space-x-3 cursor-pointer mb-2">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <span className="text-sm text-gray-700">Other:</span>
                              </label>
                              <input 
                                type="text" 
                                value={formData.residenceOtherCountryDetails}
                                onChange={(e) => handleInputChange('residenceOtherCountryDetails', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Specify other border"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                                     </div>

                   {/* Fourth Row of Fields */}
                   <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                     {/* Left Side - Main Form Fields */}
                     <div className="lg:col-span-3 space-y-4">
                                             {/* Field 10: Parental authority */}
                      <div className="border border-gray-300 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-bold text-gray-700 mt-1">10.</span>
                          <div className="flex-1 min-w-0">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                              Parental authority (in case of minors) /legal guardian (surname, first name, address, if different from applicant&apos;s, telephone no., e-mail address, and nationality):
                            </label>
                            <textarea 
                              rows={3}
                              value={formData.parentalAuthority}
                              onChange={(e) => handleInputChange('parentalAuthority', e.target.value)}
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter parental authority or legal guardian details"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Field 11: National identity number */}
                      <div className="border border-gray-300 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-bold text-gray-700 mt-1">11.</span>
                          <div className="flex-1 min-w-0">
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              National identity number, where applicable:
                            </label>
                            <input 
                              type="text" 
                              value="B22547863"
                              readOnly
                              className="w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Field 12: Type of travel document */}
                      <div className="border border-gray-300 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-bold text-gray-700 mt-1">12.</span>
                          <div className="flex-1 min-w-0">
                            <label className="block text-xs font-medium text-gray-700 mb-2">
                              Type of travel document:
                            </label>
                            
                            <div className="space-y-1">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xs text-gray-700">Ordinary passport</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xs text-gray-700">Diplomatic passport</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xs text-gray-700">Service passport</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xs text-gray-700">Official passport</span>
                              </label>
                              
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="text-xs text-gray-700">Special passport</span>
                              </label>
                              
                              <div className="mt-2">
                                <label className="flex items-center space-x-2 cursor-pointer mb-1">
                                  <input type="radio" name="travel_document" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Other travel document (please specify):</span>
                                </label>
                                <input 
                                  type="text" 
                                  value={formData.otherTravelDocument}
                                  onChange={(e) => handleInputChange('otherTravelDocument', e.target.value)}
                                  className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Specify other travel document"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                                               {/* Fields 13-16: Horizontal Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {/* Field 13: Number of travel document */}
                          <div className="border border-gray-300 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <span className="text-sm font-bold text-gray-700 mt-1">13.</span>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Number of travel document:
                                </label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter document number"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Field 14: Date of issue */}
                          <div className="border border-gray-300 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <span className="text-sm font-bold text-gray-700 mt-1">14.</span>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Date of issue:
                                </label>
                                <input 
                                  type="date" 
                                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Field 15: Valid until */}
                          <div className="border border-gray-300 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <span className="text-sm font-bold text-gray-700 mt-1">15.</span>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Valid until:
                                </label>
                                <input 
                                  type="date" 
                                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Field 16: Issued by */}
                          <div className="border border-gray-300 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <span className="text-sm font-bold text-gray-700 mt-1">16.</span>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Issued by (country):
                                </label>
                                <input 
                                  type="text" 
                                  className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Enter issuing country"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                     </div>

                                           {/* Right Side - Official Use */}
                      <div className="lg:col-span-1">
                        <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                          <div className="space-y-4">
                            {/* File handled by */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-800 mb-2 text-center border-b border-gray-400 pb-1">
                                File handled by:
                              </h4>
                              <div className="h-16 border border-gray-300 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-gray-500 text-xs">Space for internal notes</span>
                              </div>
                            </div>
                            
                            {/* Supporting documents */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-800 mb-2 text-center border-b border-gray-400 pb-1">
                                Supporting documents:
                              </h4>
                              
                              <div className="space-y-1">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Travel document</span>
                                </label>
                                
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Means of subsistence</span>
                                </label>
                                
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Invitation</span>
                                </label>
                                
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">TMI</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                                       </div>

                    {/* Fifth Row of Fields */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Left Side - Main Form Fields */}
                      <div className="lg:col-span-3 space-y-4">
                        {/* Field 17: Personal data of family member */}
                        <div className="border border-gray-300 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-sm font-bold text-gray-700 mt-1">17.</span>
                            <div className="flex-1 min-w-0">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Personal data of the family member who is an EU, EEA or CH citizen if applicable:
                              </label>
                              
                              {/* First row */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Surname (Family name):
                                  </label>
                                  <input 
                                    type="text" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter surname"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    First name(s) (Given name(s)):
                                  </label>
                                  <input 
                                    type="text" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter first name(s)"
                                  />
                                </div>
                              </div>
                              
                              {/* Second row */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Date of birth (day-month-year):
                                  </label>
                                  <input 
                                    type="date" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Nationality:
                                  </label>
                                  <input 
                                    type="text" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter nationality"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Number of travel document or ID card:
                                  </label>
                                  <input 
                                    type="text" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter document number"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Field 18: Family relationship */}
                        <div className="border border-gray-300 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-sm font-bold text-gray-700 mt-1">18.</span>
                            <div className="flex-1 min-w-0">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Family relationship with an EU, EEA or CH citizen if applicable:
                              </label>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">spouse</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">child</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">grandchild</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">dependent ascendant</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Registered Partnership</span>
                                </label>
                                <div className="flex items-center space-x-2">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-xs text-gray-700">other:</span>
                                  </label>
                                  <input 
                                    type="text" 
                                    className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Specify"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Field 19: Home address and email */}
                        <div className="border border-gray-300 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-sm font-bold text-gray-700 mt-1">19.</span>
                            <div className="flex-1 min-w-0">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Applicant&apos;s home address and e-mail address:
                              </label>
                              
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                <div className="lg:col-span-2">
                                  <textarea 
                                    rows={3}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your complete home address and email address"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Telephone no.:
                                  </label>
                                  <input 
                                    type="tel" 
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter phone number"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Field 20: Residence in other country */}
                        <div className="border border-gray-300 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <span className="text-sm font-bold text-gray-700 mt-1">20.</span>
                            <div className="flex-1 min-w-0">
                              <label className="block text-xs font-medium text-gray-700 mb-2">
                                Residence in a country other than the country of current nationality:
                              </label>
                              
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="radio" name="residence_other_country" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">No</span>
                                </label>
                                
                                <div className="flex items-center space-x-2">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="residence_other_country" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                    <span className="text-xs text-gray-700">Yes. Residence permit or equivalent</span>
                                  </label>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-5">
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      No.
                                    </label>
                                    <input 
                                      type="text" 
                                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      placeholder="Enter permit number"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                      Valid until
                                    </label>
                                    <input 
                                      type="date" 
                                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Visa Decision and Means of Transport */}
                      <div className="lg:col-span-1">
                        <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                          <div className="space-y-4">
                            {/* Means of transport */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-800 mb-2 text-center border-b border-gray-400 pb-1">
                                Means of transport:
                              </h4>
                              
                              <div className="space-y-1">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Airplane</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Train</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Bus</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Car</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Ship</span>
                                </label>
                                <div className="flex items-center space-x-2">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-xs text-gray-700">Other:</span>
                                  </label>
                                  <input 
                                    type="text" 
                                    className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Specify"
                                  />
                                </div>
                              </div>
                            </div>
                            
                            {/* Visa decision */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-800 mb-2 text-center border-b border-gray-400 pb-1">
                                Visa decision:
                              </h4>
                              
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                  <span className="text-xs text-gray-700">Refused</span>
                                </label>
                                
                                <div className="space-y-1">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-xs text-gray-700">Issued:</span>
                                  </label>
                                  
                                  <div className="ml-4 space-y-1">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                      <span className="text-xs text-gray-700">A</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                      <span className="text-xs text-gray-700">C</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                      <span className="text-xs text-gray-700">LTV</span>
                                    </label>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-xs text-gray-700">Valid:</span>
                                  </label>
                                  
                                  <div className="ml-4 space-y-1">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        From:
                                      </label>
                                      <input 
                                        type="date" 
                                        className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Until:
                                      </label>
                                      <input 
                                        type="date" 
                                        className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                                         </div>

                     {/* Sixth Row of Fields */}
                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                       {/* Left Side - Main Form Fields */}
                       <div className="lg:col-span-3 space-y-4">
                         {/* Field 21: Current occupation */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">21.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Current occupation:
                               </label>
                               <input 
                                 type="text" 
                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter your current occupation"
                               />
                             </div>
                           </div>
                         </div>

                         {/* Field 22: Employer and employer's address */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">22.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Employer and employer&apos;s address and telephone number. For students, name and address of educational establishment:
                               </label>
                               <textarea 
                                 rows={3}
                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter employer details or educational establishment information"
                               />
                             </div>
                           </div>
                         </div>

                         {/* Field 23: Purpose of journey */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">23.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Purpose(s) of the journey:
                               </label>
                               
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Tourism</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Business</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Visiting family or friends</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Cultural</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Sports</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Official visit</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Medical reasons</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Study</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Airport transit</span>
                                 </label>
                                 <div className="flex items-center space-x-2">
                                   <label className="flex items-center space-x-2 cursor-pointer">
                                     <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                     <span className="text-xs text-gray-700">Other (please specify):</span>
                                   </label>
                                   <input 
                                     type="text" 
                                     className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                     placeholder="Specify"
                                   />
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Field 24: Additional information on purpose */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">24.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Additional information on purpose of stay:
                               </label>
                               <textarea 
                                 rows={3}
                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter additional information about your purpose of stay"
                               />
                             </div>
                           </div>
                         </div>

                         {/* Field 25: Member State of main destination */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">25.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Member State of main destination (and other Member States of destination, if applicable):
                               </label>
                               <textarea 
                                 rows={2}
                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter main destination and other member states"
                               />
                             </div>
                           </div>
                         </div>

                         {/* Field 26: Member State of first entry */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">26.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Member State of first entry:
                               </label>
                               <textarea 
                                 rows={2}
                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter first entry member state"
                               />
                             </div>
                           </div>
                         </div>

                         {/* Field 27: Number of entries requested */}
                         <div className="border border-gray-300 rounded-lg p-3">
                           <div className="flex items-start space-x-2">
                             <span className="text-sm font-bold text-gray-700 mt-1">27.</span>
                             <div className="flex-1 min-w-0">
                               <label className="block text-xs font-medium text-gray-700 mb-2">
                                 Number of entries requested:
                               </label>
                               
                               <div className="space-y-2">
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="number_of_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Single entry</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="number_of_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Two entries</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="number_of_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Multiple entries</span>
                                 </label>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Dates for intended stay */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1"></span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   Intended date of arrival of the first intended stay in the Schengen area:
                                 </label>
                                 <input 
                                   type="date" 
                                   className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               </div>
                             </div>
                           </div>

                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1"></span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   Intended date of departure from the Schengen area after the first intended stay:
                                 </label>
                                 <input 
                                   type="date" 
                                   className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* Right Side - For Official Use Only */}
                       <div className="lg:col-span-1">
                         <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                           <div className="space-y-4">
                             <h4 className="text-sm font-bold text-gray-800 mb-3 text-center border-b border-gray-400 pb-1">
                               For official use only
                             </h4>
                             
                             {/* Number of entries */}
                             <div>
                               <h5 className="text-xs font-bold text-gray-800 mb-2 text-center">
                                 Number of entries:
                               </h5>
                               <div className="space-y-1">
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="official_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">1</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="official_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">2</span>
                                 </label>
                                 <label className="flex items-center space-x-2 cursor-pointer">
                                   <input type="radio" name="official_entries" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                   <span className="text-xs text-gray-700">Multiple</span>
                                 </label>
                               </div>
                             </div>
                             
                             {/* Number of days */}
                             <div>
                               <h5 className="text-xs font-bold text-gray-800 mb-2 text-center">
                                 Number of days:
                               </h5>
                               <input 
                                 type="number" 
                                 className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 placeholder="Enter number of days"
                                 min="1"
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                                           </div>

                      {/* Seventh Row of Fields */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Side - Main Form Fields */}
                        <div className="lg:col-span-3 space-y-4">
                          {/* Field 28: Fingerprints collected previously */}
                          <div className="border border-gray-300 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <span className="text-sm font-bold text-gray-700 mt-1">28.</span>
                              <div className="flex-1 min-w-0">
                                <label className="block text-xs font-medium text-gray-700 mb-2">
                                  Fingerprints collected previously for the purpose of applying for a Schengen visa:
                                </label>
                                
                                <div className="space-y-3">
                                  <div className="space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input type="radio" name="fingerprints_collected" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                      <span className="text-xs text-gray-700">No</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                      <input type="radio" name="fingerprints_collected" className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                      <span className="text-xs text-gray-700">Yes</span>
                                    </label>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Date, if known:
                                      </label>
                                      <input 
                                        type="date" 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Visa sticker number, if known:
                                      </label>
                                      <input 
                                        type="text" 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter visa sticker number"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                                                     {/* Field 29: Entry permit for final country */}
                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1">29.</span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   Entry permit for the final country of destination, where applicable:
                                 </label>
                                 <textarea 
                                   rows={2}
                                   className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                                   placeholder="Enter entry permit details for final destination country"
                                 />
                                 
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                   <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Issued by:
                                     </label>
                                     <input 
                                       type="text" 
                                       className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                       placeholder="Enter issuing authority"
                                     />
                                   </div>
                                   <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Valid from:
                                     </label>
                                     <input 
                                       type="date" 
                                       className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                     />
                                   </div>
                                   <div>
                                     <label className="block text-xs font-medium text-gray-600 mb-1">
                                       Until:
                                     </label>
                                     <input 
                                       type="date" 
                                       className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                     />
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                        </div>

                        {/* Right Side - Empty for balance */}
                        <div className="lg:col-span-1">
                          <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                            <div className="flex items-center justify-center h-full">
                              <span className="text-gray-500 text-xs text-center">Space for additional official use</span>
                            </div>
                          </div>
                        </div>
                                             </div>

                       {/* Eighth Row of Fields */}
                       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                         {/* Left Side - Main Form Fields */}
                         <div className="lg:col-span-3 space-y-4">
                           {/* Field 30: Inviting person or hotel information */}
                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1">*30.</span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   Surname and first name of the inviting person(s) in the Member State(s). If not applicable, name of hotel(s) or temporary accommodation(s) in the Member State(s):
                                 </label>
                                 <textarea 
                                   rows={4}
                                   className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="Enter surname and first name of inviting person(s) or name of hotel(s)/temporary accommodation(s)"
                                 />
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Right Side - For Official Use Only */}
                         <div className="lg:col-span-1">
                           <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                             <div className="space-y-4">
                               <h4 className="text-sm font-bold text-gray-800 mb-3 text-center border-b border-gray-400 pb-1">
                                 For official use only
                               </h4>
                               
                               {/* Address and email of inviting person/hotel */}
                               <div>
                                 <h5 className="text-xs font-bold text-gray-800 mb-2 text-center">
                                   Address and e-mail address of inviting person(s)/hotel(s)/temporary accommodation(s):
                                 </h5>
                                 <textarea 
                                   rows={4}
                                   className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="Enter address and email"
                                 />
                               </div>
                               
                               {/* Telephone number */}
                               <div>
                                 <h5 className="text-xs font-bold text-gray-800 mb-2 text-center">
                                   Telephone no.:
                                 </h5>
                                 <input 
                                   type="tel" 
                                   className="w-full p-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   placeholder="Enter telephone number"
                                 />
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                    
                                             {/* Ninth Row of Fields */}
                       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                         {/* Left Side - Main Form Fields */}
                         <div className="lg:col-span-3 space-y-4">
                                                       {/* Field 31: Name and address of inviting company/organisation */}
                            <div className="border border-gray-300 rounded-lg p-3">
                              <div className="flex items-start space-x-2">
                                <span className="text-sm font-bold text-gray-700 mt-1">*31.</span>
                                <div className="flex-1 min-w-0">
                                  <label className="block text-xs font-medium text-gray-700 mb-2">
                                    Name and address of inviting company/organisation:
                                  </label>
                                  <textarea 
                                    rows={4}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                                    placeholder="Enter name and address of inviting company or organisation"
                                  />
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Surname, first name, address, telephone no., and e-mail address of contact person in company/organisation:
                                      </label>
                                      <textarea 
                                        rows={3}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter contact person details"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Telephone no. of company/organisation:
                                      </label>
                                      <input 
                                        type="tel" 
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter company telephone number"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                         </div>

                         {/* Right Side - Empty for balance */}
                         <div className="lg:col-span-1">
                           <div className="border-2 border-gray-400 rounded-lg p-3 bg-gray-50 h-full">
                             <div className="flex items-center justify-center h-full">
                               <span className="text-gray-500 text-xs text-center">Space for additional official use</span>
                             </div>
                           </div>
                         </div>
                       </div>
                    
                                             {/* Tenth Row of Fields */}
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {/* Left Column - Applicant himself/herself */}
                         <div className="space-y-4">
                           {/* Field 32: Cost of travelling and living */}
                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1">*32.</span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   Cost of travelling and living during the applicant&apos;s stay is covered:
                                 </label>
                                 
                                 <div className="space-y-3">
                                   <div>
                                     <h5 className="text-xs font-bold text-gray-800 mb-2">
                                       by the applicant himself/herself
                                     </h5>
                                     <div className="ml-3">
                                       <h6 className="text-xs font-medium text-gray-700 mb-2">
                                         Means of support:
                                       </h6>
                                       <div className="space-y-1">
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Cash</span>
                                         </label>
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Traveller&apos;s cheques</span>
                                         </label>
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Credit card</span>
                                         </label>
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Pre-paid accommodation</span>
                                         </label>
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Pre-paid transport</span>
                                         </label>
                                         <div className="flex items-center space-x-2">
                                           <label className="flex items-center space-x-2 cursor-pointer">
                                             <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                             <span className="text-xs text-gray-700">Other (please specify):</span>
                                           </label>
                                           <input 
                                             type="text" 
                                             className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                             placeholder="Specify"
                                           />
                                         </div>
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>

                         {/* Right Column - Sponsor */}
                         <div className="space-y-4">
                           <div className="border border-gray-300 rounded-lg p-3">
                             <div className="flex items-start space-x-2">
                               <span className="text-sm font-bold text-gray-700 mt-1"></span>
                               <div className="flex-1 min-w-0">
                                 <label className="block text-xs font-medium text-gray-700 mb-2">
                                   by a sponsor (host, company, organisation), please specify:
                                 </label>
                                 
                                 <div className="space-y-3">
                                   <div className="space-y-2">
                                     <div className="flex items-center space-x-2">
                                       <input 
                                         type="text" 
                                         className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                         placeholder="Enter sponsor details"
                                       />
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">referred to in field 30</span>
                                       </label>
                                     </div>
                                     <div className="flex items-center space-x-2">
                                       <span className="text-xs text-gray-700">or 31</span>
                                       <input 
                                         type="text" 
                                         className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                         placeholder="Enter details"
                                       />
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">other (please specify):</span>
                                       </label>
                                     </div>
                                     <input 
                                       type="text" 
                                       className="w-full p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                       placeholder="Specify other sponsor"
                                     />
                                   </div>
                                   
                                   <div>
                                     <h6 className="text-xs font-medium text-gray-700 mb-2">
                                       Means of support:
                                     </h6>
                                     <div className="space-y-1">
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">Cash</span>
                                       </label>
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">Accommodation provided</span>
                                       </label>
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">All expenses covered during the stay</span>
                                       </label>
                                       <label className="flex items-center space-x-2 cursor-pointer">
                                         <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                         <span className="text-xs text-gray-700">Pre-paid transport</span>
                                       </label>
                                       <div className="flex items-center space-x-2">
                                         <label className="flex items-center space-x-2 cursor-pointer">
                                           <input type="checkbox" className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                           <span className="text-xs text-gray-700">Other (please specify):</span>
                                         </label>
                                         <input 
                                           type="text" 
                                           className="flex-1 p-1 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                           placeholder="Specify"
                                         />
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>

                                               {/* Instructions and Declarations Section */}
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold text-gray-800 mb-3 text-center border-b border-gray-400 pb-2">
                              Instructions and Declarations
                            </h4>
                            
                            <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
                              <p>
                                I am aware that the visa fee is not refunded if the visa is refused.
                              </p>
                              
                              <p>
                                <strong>Applicable in case a multiple-entry visa is applied for:</strong><br />
                                I am aware of the need to have an adequate travel medical insurance for my first stay and any subsequent visits to the territory of Member States.
                              </p>
                              
                              <p>
                                I am aware of and consent to the following: the collection of the data required by this application form and the taking of my photograph and, if applicable, the taking of fingerprints, are mandatory for the examination of the application; and any personal data concerning me which appear on the application form, as well as my fingerprints and my photograph will be supplied to the relevant authorities of the Member States and processed by those authorities, for the purposes of a decision on my application.
                              </p>
                              
                              <p>
                                Such data as well as data concerning the decision taken on my application or a decision whether to annul, revoke or extend a visa issued will be entered into, and stored in the Visa Information System (VIS) for a maximum period of five years, during which it will be accessible to the visa authorities and the authorities competent for carrying out checks on visas at external borders and within the Member States, immigration and asylum authorities in the Member States for the purposes of verifying whether the conditions for the legal entry into, stay and residence on the territory of the Member States are fulfilled, of identifying persons who do not or who no longer fulfil these conditions, of examining an asylum application and of determining responsibility for such examination. Under certain conditions the data will be also available to designated authorities of the Member States (per l&apos;Italia the Ministry of Interior and the Police authority) and to Europol for the purpose of the prevention, detection and investigation of terrorist offences and of other serious criminal offences. The Ministry of Foreign Affairs and International Cooperation – MAECI (Piazzale della Farnesina 1, 00135 Roma) www.esteri.it tel. 0039 06 36911 (switchboard), through the Diplomatic Representation or Consulate where the visa application has been lodged, is the authority responsible for processing the data.
                              </p>
                              
                              <p>
                                I am aware that I have the right to obtain, in any of the Member States, notification of the data relating to me recorded in the VIS and of the Member State which transmitted the data, and to request that data relating to me which are inaccurate be corrected and that data relating to me processed unlawfully be deleted. At my express request, the authority examining my application (for the Diplomatic Representations or Consulates please visit www.esteri.it e http://vistoperitalia.esteri.it) will inform me of the manner in which I may exercise my right to check the personal data concerning me and have them corrected or deleted, including the related remedies according to the national law of the Member State concerned. The Italian national supervisory competent authority on the protection of personal data is the MAECI Data Protection Officer / DPO (email: rpd@esteri.it, certified email: rpd@cert.esteri.it) or the Italian Data Protection Authority (Piazza Venezia 11, 00187 ROMA; tel. 0039 06 696771 (switchboard); email: garante@gpdp.it; pec: protocollo@pec.gpdp.it).
                              </p>
                              
                              <p>
                                I declare that to the best of my knowledge all particulars supplied by me are correct and complete. I am aware that any false statements will lead to my application being rejected or to the annulment of a visa already granted and may also render me liable to prosecution under the law of the Member State which deals with the application.
                              </p>
                              
                              <p>
                                I undertake to leave the territory of the Member States before the expiry of the visa, if granted. I have been informed that possession of a visa is only one of the prerequisites for entry into the European territory of the Member States. The mere fact that a visa has been granted to me does not mean that I will be entitled to compensation if I fail to comply with the relevant provisions of Article 6(1) of Regulation (EU) No 2016/399 (Schengen Borders Code) and I am therefore refused entry. The prerequisites for entry will be checked again on entry into the European territory of the Member States.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Signature and Date Section */}
                        <div className="border border-gray-300 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column - Place and Date */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Place and date:
                              </label>
                              <div className="h-20 border border-gray-300 bg-white rounded-lg flex items-center px-3">
                                <span className="text-gray-500 text-sm">Space for place and date</span>
                              </div>
                            </div>
                            
                            {/* Right Column - Signature */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Signature:
                              </label>
                              <div className="text-xs text-gray-600 mb-2">
                                (signature of parental authority/legal guardian, if applicable):
                              </div>
                              <div className="h-20 border border-gray-300 bg-white rounded-lg flex items-center px-3">
                                <span className="text-gray-500 text-sm">Space for signature</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                          <button 
                            onClick={handleApplicationSubmission}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200 flex items-center space-x-2"
                          >
                            <span>Submit Application</span>
                            <span>→</span>
                          </button>
                        </div>

              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
