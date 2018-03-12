App Flow

- User signs up via Google                              (Express server + MongoDB + PassportJS)
- User paus for email credits via stripe                (Stripe + MongoDB)
- User creates a new 'campaign'                         (React + Redux)
- user enters list of emails to send a survey to        (React + Redux + Redux Form)
- we send email to list of surveyees                    (Email Provider)
- Surveyees click on link in email to provide feedback  (Email Provider + Express + Mongo)
- we tabulate feedback                                  (Mongo?)
- User can see report all survey responses              (Mongo + React + Redux)
