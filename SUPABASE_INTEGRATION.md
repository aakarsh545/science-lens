# Supabase + OpenAI Integration Guide

## Overview

This Science Lens app now includes a complete backend integration using Supabase Edge Functions and OpenAI API. The integration provides secure API key management, database logging, and scalable architecture.

## Architecture

### Database Tables

1. **`ai_logs`** - Stores all AI interactions
   - `id` (serial primary key)
   - `prompt` (text) - User's question
   - `response` (text) - AI's response
   - `created_at` (timestamp) - When the interaction occurred

2. **`articles`** - Stores science articles
   - `id` (serial primary key)
   - `title` (text) - Article title
   - `content` (text) - Article content
   - `created_at` (timestamp) - Creation timestamp
   - `updated_at` (timestamp) - Last update timestamp

### Edge Functions

#### 1. `/api/ask` (POST)
- **Purpose**: Main AI interaction endpoint
- **Functionality**: 
  - Accepts user questions via POST request
  - Calls OpenAI API (gpt-4o-mini model)
  - Logs both prompt and response to `ai_logs` table
  - Returns AI response to frontend
- **Request Body**: `{ "prompt": "your question here" }`
- **Response**: `{ "response": "AI response", "logged": true }`

#### 2. `/api/test-openai` (GET)
- **Purpose**: Health check for OpenAI integration
- **Functionality**: 
  - Tests OpenAI API connection
  - Returns "Hello from GPT!" message
  - Verifies API key is working
- **Response**: `{ "message": "Hello from GPT!", "status": "OpenAI connection successful" }`

#### 3. `/api/data` (GET/POST/PUT/DELETE)
- **Purpose**: CRUD operations for articles
- **GET**: Fetch all articles
- **POST**: Create new article - `{ "title": "...", "content": "..." }`  
- **PUT**: Update article - `{ "id": 1, "title": "...", "content": "..." }`
- **DELETE**: Delete article - `{ "id": 1 }`

## Security Features

- **API Key Protection**: OpenAI API key stored as Supabase secret (server-side only)
- **Row Level Security (RLS)**: Enabled on both tables with public access policies
- **CORS Headers**: Properly configured for web app access
- **Error Handling**: Comprehensive error logging and user-friendly responses

## Frontend Changes

The frontend has been updated to:
- Use Supabase Edge Functions instead of direct OpenAI API calls
- Remove client-side API key management
- Implement proper error handling for backend calls
- Maintain the same user experience with enhanced reliability

## Testing

### API Test Suite
Visit `/api-test` in your app to access the comprehensive test suite:

1. **OpenAI Connection Test**: Verifies the OpenAI API key and connection
2. **Ask Endpoint Test**: Tests the main AI interaction with database logging
3. **Data Endpoint Test**: Tests article CRUD operations

### Manual Testing

1. **Test OpenAI Endpoint**:
   ```bash
   curl -X GET https://your-project.supabase.co/functions/v1/test-openai
   ```

2. **Test Ask Endpoint**:
   ```bash
   curl -X POST https://your-project.supabase.co/functions/v1/ask \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Explain gravity in 5 words"}'
   ```

3. **Test Data Endpoint**:
   ```bash
   # Create article
   curl -X POST https://your-project.supabase.co/functions/v1/data \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Article", "content": "This is test content"}'
   
   # Get all articles
   curl -X GET https://your-project.supabase.co/functions/v1/data
   ```

## Environment Setup

The integration uses Supabase secrets for secure environment variable management:

- `OPENAI_API_KEY`: Your OpenAI API key (configured via Supabase secrets)
- `SUPABASE_URL`: Automatically available in Edge Functions
- `SUPABASE_SERVICE_ROLE_KEY`: Automatically available in Edge Functions

## Benefits

1. **Security**: API keys are server-side only
2. **Scalability**: Supabase Edge Functions auto-scale
3. **Reliability**: Built-in error handling and fallbacks  
4. **Analytics**: All interactions are logged to the database
5. **Flexibility**: Easy to extend with new endpoints and features
6. **Performance**: Optimized for fast response times

## Future Enhancements

- User authentication integration for personalized experiences
- Rate limiting and usage analytics
- Advanced AI prompt engineering
- Real-time collaboration features
- Integration with additional AI models

## Troubleshooting

1. **OpenAI API Errors**: Check the Edge Function logs in Supabase dashboard
2. **Database Issues**: Verify RLS policies and table permissions
3. **CORS Errors**: Ensure Edge Functions include proper CORS headers
4. **Authentication**: Check Supabase auth configuration if implementing user accounts

For detailed logs and monitoring, visit your Supabase project dashboard under Edge Functions > Logs.