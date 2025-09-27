import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Settings,
  Edit,
  Save,
  Loader2,
  Key,
  DollarSign,
} from "lucide-react";

const PaymentGateways = () => {
  const navigate = useNavigate();
  
  const [gateways, setGateways] = useState({
    paypal: {
      connected: true,
      clientId: "",
      secret: "",
      isEditing: false,
    },
    stripe: {
      connected: true,
      publishableKey: "",
      secretKey: "",
      webhookSecret: "",
      isEditing: false,
    },
    wise: {
      connected: true,
      apiKey: "",
      accountId: "",
      isEditing: false,
    },
    paytm: {
      connected: true,
      merchantId: "",
      merchantKey: "",
      website: "",
      industry: "",
      isEditing: false,
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = useCallback((gateway, field, value) => {
    setGateways(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        [field]: value,
      },
    }));
  }, []);

  const toggleEdit = useCallback((gateway) => {
    setGateways(prev => ({
      ...prev,
      [gateway]: {
        ...prev[gateway],
        isEditing: !prev[gateway].isEditing,
      },
    }));
  }, []);

  const handleSave = useCallback(async (gateway) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGateways(prev => ({
        ...prev,
        [gateway]: {
          ...prev[gateway],
          isEditing: false,
          connected: true,
        },
      }));
      setIsSaving(false);
      alert(`${gateway.toUpperCase()} settings updated successfully!`);
    } catch (error) {
      setIsSaving(false);
      alert(`Error saving ${gateway} settings. Please try again.`);
    }
  }, []);

  const getStatusIcon = (connected) => {
    return connected ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  const renderPaypalForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Client ID
        </label>
        <input
          id="paypal-client-id"
          name="clientId"
          type="text"
          value={config.clientId}
          onChange={(e) => handleInputChange('paypal', 'clientId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your PayPal Client ID"
          aria-label="PayPal Client ID"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Secret
        </label>
        <input
          id="paypal-secret"
          name="secret"
          type="password"
          value={config.secret}
          onChange={(e) => handleInputChange('paypal', 'secret', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your PayPal Secret"
          aria-label="PayPal Secret"
        />
      </div>
    </div>
  );

  const renderStripeForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-purple-600" />
          Publishable Key
        </label>
        <input
          id="stripe-publishable-key"
          name="publishableKey"
          type="text"
          value={config.publishableKey}
          onChange={(e) => handleInputChange('stripe', 'publishableKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="pk_..."
          aria-label="Stripe Publishable Key"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-purple-600" />
          Secret Key
        </label>
        <input
          id="stripe-secret-key"
          name="secretKey"
          type="password"
          value={config.secretKey}
          onChange={(e) => handleInputChange('stripe', 'secretKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="sk_..."
          aria-label="Stripe Secret Key"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-purple-600" />
          Webhook Secret
        </label>
        <input
          id="stripe-webhook-secret"
          name="webhookSecret"
          type="text"
          value={config.webhookSecret}
          onChange={(e) => handleInputChange('stripe', 'webhookSecret', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="whsec_..."
          aria-label="Stripe Webhook Secret"
        />
      </div>
    </div>
  );

  const renderWiseForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-green-600" />
          API Key
        </label>
        <input
          id="wise-api-key"
          name="apiKey"
          type="text"
          value={config.apiKey}
          onChange={(e) => handleInputChange('wise', 'apiKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Wise API Key"
          aria-label="Wise API Key"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          Account ID
        </label>
        <input
          id="wise-account-id"
          name="accountId"
          type="text"
          value={config.accountId}
          onChange={(e) => handleInputChange('wise', 'accountId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Wise Account ID"
          aria-label="Wise Account ID"
        />
      </div>
    </div>
  );

  const renderPaytmForm = (config) => (
    <div className="space-y-4">
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Merchant ID
        </label>
        <input
          id="paytm-merchant-id"
          name="merchantId"
          type="text"
          value={config.merchantId}
          onChange={(e) => handleInputChange('paytm', 'merchantId', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Paytm Merchant ID"
          aria-label="Paytm Merchant ID"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Key className="w-4 h-4 mr-2 text-orange-600" />
          Merchant Key
        </label>
        <input
          id="paytm-merchant-key"
          name="merchantKey"
          type="password"
          value={config.merchantKey}
          onChange={(e) => handleInputChange('paytm', 'merchantKey', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Your Paytm Merchant Key"
          aria-label="Paytm Merchant Key"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <input
          id="paytm-website"
          name="website"
          type="text"
          value={config.website}
          onChange={(e) => handleInputChange('paytm', 'website', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="DEFAULT"
          aria-label="Paytm Website"
        />
      </div>
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          Industry
        </label>
        <input
          id="paytm-industry"
          name="industry"
          type="text"
          value={config.industry}
          onChange={(e) => handleInputChange('paytm', 'industry', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={!config.isEditing}
          placeholder="Retail"
          aria-label="Paytm Industry"
        />
      </div>
    </div>
  );

  const gatewayConfigs = [
    {
      key: 'paypal',
      description: 'PayPal is the faster, safer way to send and receive money or make an online payment.',
      logo: 'https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/payment-gateway-01.svg',
      renderForm: renderPaypalForm,
    },
    {
      key: 'stripe',
      description: 'APIs to accept credit cards, manage subscriptions, send money.',
      logo: 'https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/payment-gateway-02.svg',
      renderForm: renderStripeForm,
    },
    {
      key: 'wise',
      description: 'Allows sending international money transfers and payments quickly with low fees.',
      logo: 'https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/payment-gateway-03.svg',
      renderForm: renderWiseForm,
    },
    {
      key: 'paytm',
      description: "Paytm stands for Pay through Mobile and is India's largest mobile payments platform.",
      logo: 'https://smarthr.co.in/demo/html/template/assets/img/payment-gateway/payment-gateway-04.svg',
      renderForm: renderPaytmForm,
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <div className="min-h-screen bg-gray-50 py-8 font-[Inter]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Go back to settings"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-[Poppins]">
                  Payment Gateways
                </h1>
                <p className="text-gray-600 mt-1">
                  Configure payment processing methods for transactions
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {gatewayConfigs.map((config) => {
              const gatewayState = gateways[config.key];
              return (
                <Card key={config.key} className="bg-white shadow-sm min-h-fit">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <img 
                        src={config.logo} 
                        alt={`${config.key} logo`} 
                        className="w-20 h-20" 
                      />
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(gatewayState.connected)}
                        <span className={`text-sm font-medium ${gatewayState.connected ? 'text-green-600' : 'text-red-600'}`}>
                          {gatewayState.connected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    <CardDescription>
                      {config.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {gatewayState.isEditing ? (
                      <>
                        {config.renderForm(gatewayState)}
                        <div className="flex justify-end space-x-3 pt-4">
                          <button
                            onClick={() => toggleEdit(config.key)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            aria-label={`Cancel editing ${config.key}`}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(config.key)}
                            disabled={isSaving}
                            className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                            aria-label={`Save ${config.key} settings`}
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Saving...</span>
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={() => toggleEdit(config.key)}
                          className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors flex items-center space-x-2"
                          aria-label={`Edit ${config.key} settings`}
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-white shadow-sm mt-8">
            <CardHeader>
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                <span className="text-lg font-semibold font-[Poppins]">
                  Test Payment Configuration
                </span>
              </div>
              <CardDescription>
                Process a test transaction to verify your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end">
                <button 
                  className="px-6 py-3 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2"
                  aria-label="Process test payment"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Process Test Payment</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PaymentGateways;