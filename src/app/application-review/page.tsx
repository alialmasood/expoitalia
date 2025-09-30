'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ApplicationData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    passportNumber: string;
    nationality: string;
    email: string;
  };
  applicationDetails: {
    visaType: string;
    purpose: string;
    duration: string;
    entryDate: string;
    exitDate: string;
  };
  formData?: {
    currentNationality: string;
    nationalityAtBirth: string;
    otherNationalities: string;
    sex: string;
    civilStatus: string;
    otherCivilStatus: string;
    travelDocument: string;
    otherTravelDocument: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    passportIssuedBy: string;
    residenceOtherCountry: string;
    residenceOtherCountryDetails: string;
    parentalAuthority: string;
    numberOfEntries: string;
    purposeOfVisit: string;
    intendedArrivalDate: string;
    intendedDepartureDate: string;
    memberStateOfFirstEntry: string;
    memberStateOfDestination: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export default function ApplicationReviewPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load application data from localStorage or state
  useEffect(() => {
    // Try to load data from localStorage first (from visa-application form)
    const savedData = localStorage.getItem('visaApplicationData');
    
    if (savedData) {
      try {
        const formData = JSON.parse(savedData);
        // Convert form data to application data format
        const convertedData = {
          personalInfo: {
            fullName: "SAJJAD RADHI ABDULHUSSSEIN BEETARWEIMI", // Fixed data
            dateOfBirth: "September 4, 1996", // Fixed data
            placeOfBirth: "Basra, Iraq", // Fixed data
            passportNumber: "B22547863", // Fixed data
            nationality: formData.currentNationality || "Iraqi",
            email: user?.email || "user@example.com"
          },
          applicationDetails: {
            visaType: "Schengen Visa",
            purpose: "Business/Exhibition",
            duration: "30 days",
            entryDate: "March 25, 2026",
            exitDate: "March 30, 2026"
          },
          // Add form data for display
          formData: formData
        };
        setApplicationData(convertedData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
        // Fall back to sample data
        setApplicationData({
          personalInfo: {
            fullName: "SAJJAD RADHI ABDULHUSSSEIN BEETARWEIMI",
            dateOfBirth: "September 4, 1996",
            placeOfBirth: "Basra, Iraq",
            passportNumber: "B22547863",
            nationality: "Iraqi",
            email: user?.email || "user@example.com"
          },
          applicationDetails: {
            visaType: "Schengen Visa",
            purpose: "Business/Exhibition",
            duration: "30 days",
            entryDate: "March 25, 2026",
            exitDate: "March 30, 2026"
          }
        });
      }
    } else {
      // Use sample data if no saved data
      const sampleData = {
        personalInfo: {
          fullName: "SAJJAD RADHI ABDULHUSSSEIN BEETARWEIMI",
          dateOfBirth: "September 4, 1996",
          placeOfBirth: "Basra, Iraq",
          passportNumber: "B22547863",
          nationality: "Iraqi",
          email: user?.email || "user@example.com"
        },
        applicationDetails: {
          visaType: "Schengen Visa",
          purpose: "Business/Exhibition",
          duration: "30 days",
          entryDate: "March 25, 2026",
          exitDate: "March 30, 2026"
        }
      };
      setApplicationData(sampleData);
    }
  }, [user]);

  const handleBackToApplication = () => {
    router.push('/visa-application');
  };

  const handleSubmitApplication = () => {
    alert('Application submitted successfully!');
    router.push('/dashboard');
  };


  const handleInvitationPayment = () => {
    if (confirm('هل أنت متأكد من المتابعة للدفع؟')) {
      // توجيه مباشر لرابط أريبا المحدد
      window.open('https://link.areeba.com/r7rL_SNhgYTEG', '_blank');
    }
  };

  const handleEntryPayment = () => {
    if (confirm('هل أنت متأكد من المتابعة للدفع؟')) {
      // توجيه مباشر لرابط أريبا المحدد للـ Entry Receipt
      const paymentWindow = window.open('https://link.areeba.com/-5weWU-wY_jga', '_blank');
      
      // مراقبة إغلاق نافذة الدفع
      if (paymentWindow) {
        const checkClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkClosed);
            // عند إغلاق نافذة الدفع، توجيه المستخدم لصفحة الطباعة
            if (confirm('تم إغلاق صفحة الدفع. هل تريد الانتقال لطباعة الوصل؟')) {
              // توجيه لصفحة طباعة الوصل
              window.open('/receipt', '_blank');
            }
          }
        }, 1000);
      }
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
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-xl tracking-wider">COSMO</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Application Review</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review your application before submission</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToApplication}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Back to Application
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Application Summary */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Summary
            </h2>
            <p className="text-lg text-gray-600">
              Please review your application details and upload the required documents
            </p>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.personalInfo.placeOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">{applicationData?.personalInfo.passportNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.personalInfo.nationality}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.personalInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Application Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.applicationDetails.visaType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.applicationDetails.purpose}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.applicationDetails.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entry Date</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData?.applicationDetails.entryDate}</p>
              </div>
            </div>
          </div>

          {/* Form Data Display */}
          {applicationData?.formData && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applicationData.formData.currentNationality && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Nationality</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.currentNationality}</p>
                  </div>
                )}
                {applicationData.formData.nationalityAtBirth && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality at Birth</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.nationalityAtBirth}</p>
                  </div>
                )}
                {applicationData.formData.otherNationalities && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Nationalities</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.otherNationalities}</p>
                  </div>
                )}
                {applicationData.formData.otherCivilStatus && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Civil Status</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.otherCivilStatus}</p>
                  </div>
                )}
                {applicationData.formData.parentalAuthority && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parental Authority/Legal Guardian</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.parentalAuthority}</p>
                  </div>
                )}
                {applicationData.formData.otherTravelDocument && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Travel Document</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.otherTravelDocument}</p>
                  </div>
                )}
                {applicationData.formData.residenceOtherCountry && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residence Other Country</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.residenceOtherCountry}</p>
                  </div>
                )}
                {applicationData.formData.residenceOtherCountryDetails && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Residence Details</label>
                    <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{applicationData.formData.residenceOtherCountryDetails}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Required Documents Upload */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Required Documents Upload
          </h3>
          
          <div className="space-y-8">
            {/* Invitation Receipt */}
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Invitation Receipt</h4>
              <p className="text-gray-600 mb-4">Upload the official invitation receipt from the exhibition organizers</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Payment Receipt Notice</p>
                    <p className="text-sm text-blue-700 mt-1">After completing the payment, your payment receipt will be sent to your email address within 3-5 business days.</p>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="invitation-receipt"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <label
                  htmlFor="invitation-receipt"
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed inline-block opacity-60"
                >
                  Choose File
                </label>
                <button
                  onClick={handleInvitationPayment}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Complete Payment</span>
                </button>
              </div>
            </div>

            {/* Entry Receipt */}
            <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Entry Receipt</h4>
              <p className="text-gray-600 mb-4">Upload the entry receipt or registration confirmation</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-green-800 font-medium">Payment Receipt Notice</p>
                    <p className="text-sm text-green-700 mt-1">After completing the payment, your payment receipt will be sent to your email address within 3-5 business days.</p>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="entry-receipt"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <label
                  htmlFor="entry-receipt"
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed inline-block opacity-60"
                >
                  Choose File
                </label>
                <button
                  onClick={handleEntryPayment}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Complete Payment</span>
                </button>
              </div>
            </div>

            {/* Participation Receipt */}
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Participation Receipt</h4>
              <p className="text-gray-600 mb-4">Upload the participation receipt or booth confirmation</p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-purple-800 font-medium">Payment Receipt Notice</p>
                    <p className="text-sm text-purple-700 mt-1">After completing the payment, your payment receipt will be sent to your email address within 3-5 business days.</p>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="participation-receipt"
              />
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <label
                  htmlFor="participation-receipt"
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed inline-block opacity-60"
                >
                  Choose File
                </label>
                <button
                  disabled
                  className="bg-gray-400 text-gray-200 px-6 py-3 rounded-lg font-medium cursor-not-allowed opacity-60 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Payment Disabled</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleBackToApplication}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200"
          >
            Back to Application
          </button>
          <button
            onClick={handleSubmitApplication}
            disabled={true}
            className="bg-gray-400 text-gray-200 px-8 py-3 rounded-lg font-medium cursor-not-allowed opacity-60 flex items-center justify-center space-x-2"
          >
            <span>Submit Application</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
