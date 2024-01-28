import { FaLinkedin, FaInstagram } from "react-icons/fa";
import ModalFooter from "../components/Modals/ModalFooter";
import { Footer } from "flowbite-react";

function MainFooter() {
  return (
    <Footer container className="mt-[2em]">
      <Footer.Copyright href="#" by="ReSearch™" year={2024} />
      <Footer.LinkGroup className="items-center">
        <Footer.Link href="#">
          <ModalFooter
            title={"Terms of Service"}
            info={
              <>
                1. Acceptance of Terms Welcome to our platform! By accessing or
                using our services, you agree to comply with and be bound by
                these Terms of Service. If you do not agree to these terms,
                please refrain from using our platform. <br />
                2. Description of Service Our platform provides various
                services, including but not limited to [describe services]. You
                agree that the use of these services is solely at your own risk
                and subject to these Terms of Service. <br />
                3. User Registration To access certain features of our platform,
                you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the
                registration process and to update such information to keep it
                accurate, current, and complete. <br />
                4. User Responsibilities
                <ul>
                  <li>
                    a. You are solely responsible for maintaining the
                    confidentiality of your account credentials and for any
                    activities that occur under your account.
                  </li>
                  <li>
                    b. You agree not to engage in any activity that could
                    disrupt, negatively impact, or inhibit other users from
                    fully enjoying our services.
                  </li>
                  <li>
                    c. Users must comply with all applicable laws and
                    regulations regarding online conduct and content.
                  </li>
                </ul>
                5. Prohibited Conduct You agree not to engage in any of the
                following prohibited activities:
                <ul>
                  <li>a. Violating any laws or regulations.</li>
                  <li>
                    b. Interfering with the security or functionality of our
                    platform.
                  </li>
                  <li>
                    c. Uploading or transmitting malicious code or harmful data.
                  </li>
                  <li>
                    d. Engaging in any form of unauthorized access or data
                    collection.
                  </li>
                  <li>
                    e. Harassing, threatening, or otherwise violating the rights
                    of others.
                  </li>
                </ul>
                6. Content Ownership and Usage Rights a. Our platform may allow
                users to submit, upload, or display content. By doing so, you
                grant us a worldwide, non-exclusive, royalty-free license to
                use, reproduce, modify, adapt, publish, distribute, and display
                such content. b. Users are responsible for ensuring that their
                content complies with applicable laws and regulations. <br />
                7. Intellectual Property a. Our platform and its original
                content, features, and functionality are owned by us and are
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property or proprietary rights
                laws. b. You agree not to reproduce, modify, distribute,
                display, perform, or create derivative works from any part of
                our platform. <br />
                8. Privacy Policy We respect your privacy and are committed to
                protecting it. Our Privacy Policy outlines how we collect, use,
                disclose, and safeguard your personal information. Please review
                our Privacy Policy to understand our practices. <br />
                9. Termination We reserve the right to terminate or suspend your
                account and access to our services at our sole discretion,
                without notice, for any reason, including but not limited to a
                breach of these Terms of Service. <br />
                10. Changes to Terms We reserve the right to modify or replace
                these Terms of Service at any time. Your continued use of our
                platform after any changes constitutes acceptance of the new
                terms. <br />
                11. Disclaimers a. Our platform is provided "as is" and "as
                available" without any warranties, either expressed or implied.
                b. We do not warrant that our services will be uninterrupted,
                secure, or error-free. <br />
                12. Limitation of Liability In no event shall we be liable for
                any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues. <br />
                13. Governing Law These Terms of Service shall be governed and
                construed in accordance with the laws of [jurisdiction]. Any
                dispute arising out of or related to these terms will be subject
                to the exclusive jurisdiction of the courts within that
                jurisdiction. <br />
                14. Contact Information If you have any questions about these
                Terms of Service, please contact us at [contact email]. <br />
                Thank you for using our platform!"
              </>
            }
          />
        </Footer.Link>
        <Footer.Link href="#">
          <ModalFooter
            title={" Software License Agreement"}
            info={
              <>
                This Software License Agreement (the "Agreement") is entered
                into by and between the licensee ("Licensee") and [Your Company
                Name] ("Licensor"). This Agreement governs the use of the
                software provided by Licensor. <br />
                1. Grant of License: Licensor grants Licensee a non-exclusive,
                non-transferable license to use the software (the "Software")
                for its intended purpose, as described in the accompanying
                documentation, solely for Licensee's internal business
                operations. <br />
                2. Restrictions:
                <ul>
                  <li>
                    a. Licensee shall not sublicense, sell, lease, or otherwise
                    transfer the Software to any third party.
                  </li>
                  <li>
                    b. Licensee shall not reverse engineer, decompile,
                    disassemble, or attempt to derive the source code of the
                    Software.
                  </li>
                  <li>
                    c. Licensee shall not modify, adapt, translate, or create
                    derivative works based on the Software without the prior
                    written consent of Licensor.
                  </li>
                </ul>
                3. Ownership: Licensor retains all rights, title, and interest
                in and to the Software, including all intellectual property
                rights. This Agreement does not grant Licensee any rights to
                patents, copyrights, trade secrets, trademarks, or any other
                rights in respect to the Software. <br />
                4. Support and Updates: Licensor may provide support and updates
                for the Software at its discretion. Any such support or updates
                shall be considered part of the Software and subject to the
                terms of this Agreement. <br />
                5. Term and Termination: This Agreement is effective upon
                acceptance by Licensee and shall continue until terminated.
                Licensor may terminate this Agreement immediately upon notice if
                Licensee breaches any provision. Upon termination, Licensee
                shall cease all use of the Software and promptly destroy all
                copies. <br />
                6. Warranty Disclaimer: The Software is provided "as is,"
                without warranty of any kind, expressed or implied, including,
                but not limited to, the warranties of merchantability, fitness
                for a particular purpose, and non-infringement. <br />
                7. Limitation of Liability: Licensor shall not be liable for any
                indirect, special, incidental, or consequential damages,
                including, but not limited to, loss of profits, arising out of
                the use or inability to use the Software. <br />
                8. Governing Law: This Agreement shall be governed by and
                construed in accordance with the laws of [Your Jurisdiction].
                Any disputes arising out of or in connection with this Agreement
                shall be subject to the exclusive jurisdiction of the courts
                within that jurisdiction. <br />
                By accepting these terms, Licensee acknowledges that it has
                read, understood, and agrees to be bound by this Software
                License Agreement.
              </>
            }
          />
        </Footer.Link>
        <Footer.Link href="#" className="mr-2">
          <FaLinkedin size={20} />
        </Footer.Link>
        <Footer.Link href="#">
          <FaInstagram size={20} />
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default MainFooter;
