const sendgrid = require('sendgrid')
const helper = sendgrid.mail // Helper obj to create Mailer
const keys = require('../config/keys')

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super()

    this.sgApi = sendgrid(keys.sendGridKey)
    this.from_email = new helper.Email('no-reply@emaily.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    // Rsegister contents
    // addContent() is built-in function from helper.Mail
    this.addContent(this.body)

    // Enable click tracking inside the email
    this.addClickTracking()

    this.addRecipients()
  }

  formatAddresses(recipients) {
    // Need another () to use ES6 destructuring in an arrow function
    return recipients.map(({ email }) => {
      // Format the email with the helper from SendGrid
      return new helper.Email(email)
    })
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization()

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON() // From helper.Mail
    })

    const response = await this.sgApi.API(request)

    return response
  }
}

module.exports = Mailer