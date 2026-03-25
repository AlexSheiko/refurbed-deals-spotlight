To run the app:
`npx expo start`

To run the tests:
`npm test`

Architectural decisions:
1. Using feature folders, and view/logic/data separation for each feature
2. Using object type for storing currency, rather than a primitive, to support different currencies
3. Extracted DealCard into a separate component file, to keep the files under 300 lines

What I do next if I had more time:
1. Extracted Theme into a separate place
2. Added more test cases