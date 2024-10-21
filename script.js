const apiKey = 'at_Dl302QLgFSqtERQATMZfoYbSUM8hY'; // Masukkan API key dari layanan API domain yang Anda pilih
const apiUrl = 'https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_Dl302QLgFSqtERQATMZfoYbSUM8hY&domainName=example.com' + apiKey;

document.getElementById('domainForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const domainName = document.getElementById('domainName').value.trim();
    const domainExtension = document.getElementById('domainExtension').value;
    const fullDomain = `${domainName}${domainExtension}`;
    
    if (validateDomainName(domainName)) {
        checkDomainAvailability(fullDomain);
    } else {
        alert('Invalid domain name. Domain name can only contain letters, numbers, and hyphens.');
    }
});

// Function to validate the domain name input
function validateDomainName(domain) {
    const regex = /^[a-zA-Z0-9-]{1,63}$/;
    return regex.test(domain);
}

// Function to check domain availability using API
function checkDomainAvailability(domain) {
    fetch(`${apiUrl}&domainName=${domain}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.DomainInfo.domainAvailability === 'AVAILABLE') {
                resultDiv.innerHTML = `<p>The domain <strong>${domain}</strong> is available! You can register it now.</p>`;
            } else {
                resultDiv.innerHTML = `<p>Sorry, the domain <strong>${domain}</strong> is already taken.</p>`;
            }
        })
        .catch(error => {
            console.error('Error checking domain availability:', error);
            alert('There was an error checking the domain availability. Please try again later.');
        });
}
