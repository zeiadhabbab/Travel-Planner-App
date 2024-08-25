import '@testing-library/jest-dom';
import { drwaResultUI } from '../client/js/draw';

describe('drwaResultUI', () => {
  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
      <div id="search-result-data"></div>
      <div id="popup-holder"></div>
      <div id="search-result-loader" class=""></div>
    `;
  });

  test('should correctly render card data', () => {
    const cardData = {
      geonameId: '12345',
      destination: 'Paris',
      countryName: 'France',
      imagesList: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      dateEnd: '2024-12-15',
      dateStart: '2024-12-01',
      durationTxt: '14 days',
      daysLeftTxt: '30 days',
      weatherDataByDate: [{
        valid_date: '2024-12-01',
        weather: { icon: 'c02d', description: 'Partly cloudy' },
        min_temp: 10,
        max_temp: 20,
        temp: 15
      }],
      flight: 'Flight information',
      lodging: 'Lodging information',
      list: 'Packing list',
      notes: 'Some notes'
    };

    // Call the function
    drwaResultUI(cardData);

    // Check if the card is rendered
    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument();

    // Check destination and country name
    expect(card).toHaveTextContent('Paris, France');


    // Check if notes, list, flight, and lodging are correctly rendered
    expect(card).toHaveTextContent('Your Notes');
    expect(card).toHaveTextContent('Some notes');
    expect(card).toHaveTextContent('Your List');
  });
});