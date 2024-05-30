import { SaveFile } from './save-file.use-case';
import fs from 'fs';



describe('SaveFileUseCase', () => { 

    const saveFile = new SaveFile();
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    

    afterEach(() => {
        const outputFolderExists = fs.existsSync( 'outputs' );
        const customOutputFolderExists = fs.existsSync( customOptions.fileDestination );
        // clean-up
        if( outputFolderExists ){
            fs.rmSync( 'outputs', { recursive: true } );
        } else if ( customOutputFolderExists ) {            
            fs.rmSync( 'custom-outputs', { recursive: true } );
        }
    })

    test('should save file with default values', () => { 

        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute( options );
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file with custom values', () => { 

        const result = saveFile.execute( customOptions );
        const fileExists = fs.existsSync( customOptions.fileDestination );
        const fileContent = fs.readFileSync( customFilePath, { encoding: 'utf-8' } );

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => { 

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error("This is a custom error message from testing"); }
        )

        const result = saveFile.execute(customOptions);
        expect( result ).toBe( false );

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => { 

        const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error("This is a custom writing error message from testing"); }
        )

        const result = saveFile.execute({ fileContent: 'Hola' });
        expect( result ).toBe( false );

        writeFileSync.mockRestore();
    });


});