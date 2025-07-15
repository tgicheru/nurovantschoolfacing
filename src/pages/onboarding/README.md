# Onboarding Process Implementation

## Overview

This directory contains the implementation of the onboarding process for the Nurovant School Facing application. The onboarding flow is designed to guide new users through the key features and functionality of the platform after they first log in.

## Flow Structure

The onboarding process consists of the following screens:

1. **Dashboard Overview** (`index.tsx`): Introduction to the dashboard interface
2. **Key Features** (`features.tsx`): Overview of the platform's main features
3. **Course Management** (`courses.tsx`): Details about course creation and management
4. **Completion** (`complete.tsx`): Final screen that marks onboarding as complete

## Implementation Details

### Authentication Integration

- The onboarding flow is triggered automatically for users who have not completed onboarding
- The `onBoarded` flag in the auth state determines whether a user needs to go through onboarding
- After successful login, users are redirected to the onboarding flow if `onBoarded` is false
- Upon completion, the `onBoarded` flag is set to true, and users are redirected to their dashboard

### Hooks

Two custom hooks manage the onboarding process:

1. **useOnboardingRedirect**: Redirects authenticated users to onboarding if needed
2. **useCompleteOnboarding**: Updates the user's onboarded status upon completion

### Images

The onboarding screens reference images from the `/assets/images/onboarding/` directory:

- `dashboard-overview.png`: Screenshot of the dashboard interface
- `features-overview.png`: Illustration of key features
- `courses-overview.png`: Screenshot of course management interface
- `completion.png`: Success/completion illustration

## Adding/Replacing Images

To replace the placeholder images with actual designs:

1. Create the following images and place them in the `/assets/images/onboarding/` directory:
   - `dashboard-overview.png`
   - `features-overview.png`
   - `courses-overview.png`
   - `completion.png`

2. Ensure the images have appropriate dimensions (recommended: 800x600px or similar 4:3 ratio)

3. For best results, use images that:
   - Have a consistent style and color scheme
   - Include clear UI elements that match the descriptions
   - Have sufficient contrast against the light background
   - Are optimized for web (compressed without quality loss)

## Customization

To customize the onboarding flow:

- Add or remove screens by creating new components and updating the routes in `src/router/routes.tsx`
- Modify the content of each screen to match your specific application features
- Adjust the pagination dots to reflect the number of screens in your flow
- Update the navigation logic in each component to maintain the correct flow

## Testing

Test the onboarding flow by:

1. Logging in with a new user account
2. Verifying automatic redirection to the onboarding flow
3. Navigating through all screens
4. Confirming that the `onBoarded` flag is set to true after completion
5. Verifying that subsequent logins go directly to the dashboard
