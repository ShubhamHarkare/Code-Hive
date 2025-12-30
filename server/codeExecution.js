const express = require('express');
const router = express.Router()


const LANGUAGE_MAP = {
    'python' : 'python',
    'c++': 'c++',
    'javascript': 'javascript' 
}


//TODO: POST API call to execute the code
router.post('/execute', async (request,response) => {
    try {
        const { code, language, input = ''} = request.body;

        if (!code || !language) {
            return response.status(400).json({
                'error' : 'Code and language are required'
            })
        }
        const pistonLanguage = LANGUAGE_MAP[language];
        if (!pistonLanguage) {
            return response.status(400).json({
                'error' : 'Language not supported'
            })
        }

        //!Execution of the code
        const pistionResponse = await fetch('https://emkc.org/api/v2/piston/execute',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: pistonLanguage,
                version: "*",
                files: [
                    {
                        name:  'main',
                        content: code
                    }
                ],
                stdin: input,
                args: [],
                compile_timeout: 100000,
                run_timeout: 100000,
                compile_memory_limit: -1,
                run_memory_limit: -1
            })
        })
        if(!pistionResponse.ok) {
            throw new Error('PistonAPI request failed');
        }
        const result = await pistionResponse.json();
        const output = {
        status: result.run.code === 0 ? 'Success' : 'Runtime Error',
        output: result.run.stdout || '',
        error: result.run.stderr || result.compile?.stderr || '',
        language: result.language,
        version: result.version
        };

        response.json(output)
    } catch (error) {
        console.error("Execution error", error);
        response.status(500).json({
            error: 'Falied to execute code',
            details: error.message
        })
        
    }
})

router.get('/languages', async (req, res) => {
  try {
    const response = await fetch('https://emkc.org/api/v2/piston/runtimes');
    const runtimes = await response.json();
    
    // Filter for our supported languages
    const supportedLanguages = runtimes.filter(runtime => 
      ['python', 'javascript', 'c++'].includes(runtime.language)
    );

    res.json(supportedLanguages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    res.status(500).json({ error: 'Failed to fetch languages' });
  }
});

module.exports = router;