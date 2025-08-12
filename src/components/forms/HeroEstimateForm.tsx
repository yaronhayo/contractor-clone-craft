import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFormValidation, validationPatterns } from '@/hooks/useFormValidation';
import { siteConfig } from '@/config/site-config';
import { Loader2 } from 'lucide-react';

type HeroFormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  timeframe: string;
  service: string;
  comments: string;
  consent: boolean;
};

const HeroEstimateForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateForm,
    reset
  } = useFormValidation<HeroFormData>(
    {
      name: '',
      phone: '',
      email: '',
      address: '',
      timeframe: '',
      service: '',
      comments: '',
      consent: false
    },
    {
      name: {
        required: true,
        minLength: 2,
        message: 'Please enter your full name'
      },
      phone: {
        required: true,
        pattern: validationPatterns.phone,
        message: 'Please enter a valid phone number'
      },
      email: {
        required: true,
        pattern: validationPatterns.email,
        message: 'Please enter a valid email address'
      },
      address: {
        required: true,
        minLength: 5,
        message: 'Please enter your service address'
      },
      timeframe: {
        required: true,
        message: 'Please select when you need service'
      },
      service: {
        required: true,
        message: 'Please select the service you need'
      },
      comments: {
        required: false
      },
      consent: {
        required: true,
        message: 'Please agree to be contacted about your estimate'
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your information",
        description: "There are errors in the form that need to be corrected.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Track form submission
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submit',
          form_name: 'hero_estimate_request',
          service: values.service,
          timeframe: values.timeframe
        });
      }

      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Request submitted successfully!",
        description: "We'll contact you within 15 minutes to schedule your free estimate.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly at " + siteConfig.business.phone,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border">
      <h3 className="text-lg font-bold text-card-foreground mb-4 text-center">
        Get Your Free Estimate Today
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={values.name}
              onChange={(e) => setValue('name', e.target.value)}
              onBlur={() => setFieldTouched('name')}
              className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground placeholder-foreground/60 focus:ring-2 focus:ring-ring transition-all text-sm ${
                errors.name && touched.name 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-ring'
              }`}
              disabled={isSubmitting}
            />
            {errors.name && touched.name && (
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={values.phone}
              onChange={(e) => setValue('phone', e.target.value)}
              onBlur={() => setFieldTouched('phone')}
              className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground placeholder-foreground/60 focus:ring-2 focus:ring-ring transition-all text-sm ${
                errors.phone && touched.phone 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-border focus:border-ring'
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && touched.phone && (
              <p className="text-destructive text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={values.email}
            onChange={(e) => setValue('email', e.target.value)}
            onBlur={() => setFieldTouched('email')}
            className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground placeholder-foreground/60 focus:ring-2 focus:ring-ring transition-all text-sm ${
              errors.email && touched.email 
                ? 'border-destructive focus:border-destructive' 
                : 'border-border focus:border-ring'
            }`}
            disabled={isSubmitting}
          />
          {errors.email && touched.email && (
            <p className="text-destructive text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <input 
            type="text" 
            placeholder="Service Address" 
            value={values.address}
            onChange={(e) => setValue('address', e.target.value)}
            onBlur={() => setFieldTouched('address')}
            className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground placeholder-foreground/60 focus:ring-2 focus:ring-ring transition-all text-sm ${
              errors.address && touched.address 
                ? 'border-destructive focus:border-destructive' 
                : 'border-border focus:border-ring'
            }`}
            disabled={isSubmitting}
          />
          {errors.address && touched.address && (
            <p className="text-destructive text-xs mt-1">{errors.address}</p>
          )}
        </div>
        
        <select 
          value={values.timeframe}
          onChange={(e) => setValue('timeframe', e.target.value)}
          onBlur={() => setFieldTouched('timeframe')}
          className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground focus:ring-2 focus:ring-ring transition-all text-sm ${
            errors.timeframe && touched.timeframe 
              ? 'border-destructive focus:border-destructive' 
              : 'border-border focus:border-ring'
          }`}
          disabled={isSubmitting}
        >
          <option value="">When do you need service?</option>
          <option value="ASAP">ASAP (Emergency)</option>
          <option value="Today If Possible">Today If Possible</option>
          <option value="Within 24 hours">Within 24 hours</option>
          <option value="Within 3 days">Within 3 days</option>
          <option value="This week">This week</option>
          <option value="Not urgent">Not urgent</option>
        </select>
        {errors.timeframe && touched.timeframe && (
          <p className="text-destructive text-xs mt-1">{errors.timeframe}</p>
        )}
        
        <select 
          value={values.service}
          onChange={(e) => setValue('service', e.target.value)}
          onBlur={() => setFieldTouched('service')}
          className={`w-full px-3 py-2 rounded-lg border bg-input text-foreground focus:ring-2 focus:ring-ring transition-all text-sm ${
            errors.service && touched.service 
              ? 'border-destructive focus:border-destructive' 
              : 'border-border focus:border-ring'
          }`}
          disabled={isSubmitting}
        >
          <option value="">Select Garage Door Service</option>
          <option value="garage-door-spring-repair">Garage Door Spring Repair</option>
          <option value="garage-door-repair">Garage Door Repair</option>
          <option value="garage-door-opener-repair">Garage Door Opener Repair</option>
          <option value="garage-door-installation">Garage Door Installation</option>
          <option value="emergency-garage-door-repair">24/7 Emergency Repair</option>
          <option value="commercial-garage-door-service">Commercial Garage Door Service</option>
        </select>
        {errors.service && touched.service && (
          <p className="text-destructive text-xs mt-1">{errors.service}</p>
        )}
        
        <div>
          <textarea 
            placeholder="Additional comments or details about your garage door issue (optional)"
            value={values.comments}
            onChange={(e) => setValue('comments', e.target.value)}
            onBlur={() => setFieldTouched('comments')}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border bg-input text-foreground placeholder-foreground/60 focus:ring-2 focus:ring-ring transition-all text-sm border-border focus:border-ring resize-vertical"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={values.consent}
            onChange={(e) => setValue('consent', e.target.checked)}
            onBlur={() => setFieldTouched('consent')}
            className="mt-1 h-4 w-4 text-primary bg-input border-border rounded focus:ring-2 focus:ring-ring"
            disabled={isSubmitting}
          />
          <label htmlFor="consent" className="text-xs text-foreground leading-relaxed">
            I agree to be contacted by ez2fix regarding my estimate request via phone, email, or text message. I understand this is not required to receive service.
          </label>
        </div>
        {errors.consent && touched.consent && (
          <p className="text-destructive text-xs mt-1">{errors.consent}</p>
        )}
        
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="w-full text-base py-3 rounded-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Get My Free Estimate'
          )}
        </Button>
      </form>
    </div>
  );
};

export default HeroEstimateForm;